## 一、通信方式概览
1. `props`
2. 自定义事件
3. 全局事件总线
4. `v-model`
5. `.sync`修饰符
6. `$attrs`与`$listeners`
7. `$ref`、`$children`、`$parent`
8. `provide`与`inject`
9. `Vuex`
10. 作用域插槽


## 二、10种组件通信方式
### 第1种：props
概述：`props`是使用频率最高的一种通信方式，常用与 ：**父↔ 子**。

- 若 **父传子**：属性值是**非函数**。
- 若 **子传父**：属性值是**函数**。

---

### 第2种：自定义事件

1. 概述：自定义事件常用于：**子 => 父。**
2. 注意区分好：原生事件、自定义事件。

- 原生事件：
   - 可用在`html`标签上、也可用在`组件标签`上（用在`组标签上`要加`.native`）。
   - 事件名是特定的（`click`、`mosueenter`等等）	
   - 事件对象`$event`: 是包含事件相关信息的对象（`pageX`、`pageY`、`target`、`keyCode`）
- 自定义事件：
   - 只能用在组件标签上(不加`.native`)
   - 事件名是任意名称
   - <strong style="color:red">事件对象`$event`: 是调用`$emit`时所提供的数据，可以是任意类型, 甚至是`undefined`</strong >

3. 示例：
- 在父组件中，给子组件绑定自定义事件：
```vue
<!-- 第一种绑定方式 -->
<Child @event-name="callback($event)">

<!-- 第二种绑定方式 -->
<Child ref="child">

mounted(){
	this.$refs.child.$on('event-name',this.callback)
}
```

- 子组件中，触发事件：
```javascript
this.$emit('eventName', data)
```

---

### 第3种：全局事件总线

1. 概述：与消息订阅与发布（`pubsub`）功能类似，可以实现任意组件间通信。
2. 具体编码如下：

第一步：安装总线：
```javascript
new Vue({
	el:'#app',
	// 安装事件总线
	beforeCreate() {
		Vue.prototype.$bus = this
	},
	render: h => h(App),
})
```
第二步：接收数据的组件中：绑定事件、同时在销毁前解绑事件：
```vue
<script>
  export default {
    name:'Test',
	    // 组件实例创建后，立即找到$bus给其绑定事件
		created(){
			// 在接收数据的组件中，给$bus绑定事件
			this.$bus.$on('event-name', this.callBack)
		},
	    // 组件实例销毁前，找到$bus给其解绑事件
		beforeDestroy(){
			// 解绑事件
			this.$bus.$off('event-name')
		},
		// 在methods中准备好事件的回调 —— callBack
		methods:{
			callBack(value){
				console.log(value)
			}
		}
  }
</script>
```
第三步：提供数据的组件，在合适的时候触发事件
```javascript
 this.$bus.$emit('event-name',xxxx)
```
注意这个重要的内置关系![realition [2].png](https://cdn.nlark.com/yuque/0/2023/png/35780599/1682061844069-39933b81-8d25-46b8-8f5e-2342737404f5.png#averageHue=%2355514c&clientId=ub3d7dd3f-0919-4&from=paste&height=960&id=u1f51ce19&originHeight=2400&originWidth=3840&originalType=binary&ratio=2.5&rotation=0&showTitle=false&size=314846&status=done&style=none&taskId=u4a530a19-4d3e-4432-a29a-7e09d03bfe2&title=&width=1536)

---

### 第4种：v-model

1. 概述：实现 **父↔子** 之间相互通信。
2. 组件标签上的`v-model`的本质：`:value` ＋ `input`事件。
3. 具体编码：

第一步：在父组件中，给子组件标签上使用`v-mode`指令：
```html
<!-- 给子组件标签加v-model -->
<MyInput v-model="tel" />

<!-- 上述代码等价于下面代码 -->
<MyInput :value="tel" @input="tel = $event" />
```
第二步：在子组件中，接收并`value`属性，并触发`input`事件
```vue
<template>
	<div class="child">
		<!-- 	将接收的value值赋给input元素的value属性，目的是：为了呈现值	 -->
		<!-- 	
			给input元素绑定input事件，发生原生input事件时，
			触发组件实例上的自定义input事件，并传递输入的值	
		-->
		<input type="text" :value="value" @input="$emit('input',$event.target.value)">
	</div>
</template>

<script>
	export default {
		name: 'MyInput',
		props:['value']
	}
</script>
```

------



### 第5种：`.sync`修饰符

1. 概述：在原本`props`实现 **父→子** 的基础上，增加 **子→父。**
2. `.sync`修饰符的本质：通过自定义事件，接收子组件过来的数据。
3. 具体编码：

第一步：在父组件中，给子组件传递`props`时使用`.sync`修饰符
```vue
<template>
	<div class="box">
		<h2>父组件 —— 我有{{total}}元</h2>
		<Child1 :money="total" @update:money="total = $event"/>
        
		<!-- 上面这行代码，与下面这行是等价的 -->
		<Child2 :money.sync="total"/>
	</div>
</template>
```
第二步：子组件中在何时的时候，触发名为`update:xxxx`的自定义事件
```vue
<template>
  <div class="child2">
		<h2>子组件 —— 父亲给我的钱：{{money}}元</h2>
    <button @click="$emit('update:money',money-1)">点我</button>
  </div>
</template>

<script>
  export default {
    name: 'Xxxxx',
    props: ['money']
  }
</script>
```
应用：`element-ui`在有显示隐藏的组件上: `Dialog` / `Drawer`

------



### 第6种：`$attrs` 与 `$listeners`

1. 概述：
   - `$attrs`用于实现**当前组件的父组件**，向**当前组件的子组件**通信（**祖→孙**）。
   - `$listeners`用于实现**当前组件的子组件**，向**当前组件的父组件**通信（**孙→祖**）。
2. 具体说明：
   - `$attrs`是一个对象，包含所有父组件传入的标签属性。
      - 注意：`$attrs`会自动排除：`props`中声明的属性、`class`属性、`style`属性。
   - `$listeners`是一个对象，父组件传入的所有自定义事件，都存储在这里。
3. 具体编码
- 祖组件中：
```vue
<template>
  <div class="parent">
    <h2>父组件 —— 收到孙子的礼物：{{gift}}</h2>
		<Child @send-gift="saveGift" :a="a" :b="b" :c="c" :d="d"/>
  </div>
</template>

<script>
  import Child from './Child'

  export default {
    name: 'Index',
		components:{Child},
		data() {
			return {
				a:1,
				b:2,
				c:3,
				d:4,
				gift:''
			}
		},
		methods:{
			saveGift(value){
				this.gift = value
			}
		}
  }
</script>
```

- 子组件中的代码如下：
```vue
<template>
	<div class="child">
		<h2>子组件 —— 父给的数据：a是{{a}}</h2>
		<!--  将自己没有在proos中声明的属性、绑定了的自定义事件，全都传递给Son组件  -->
		<GrandChild v-bind="$attrs" v-on="$listeners"/>
	</div>
</template>

<script>
	import GrandChild from './GrandChild.vue'

	export default {
		name:'Child',
		props:['a'],
		components:{GrandChild}
	}
</script>
```

- 孙组件中代码如下：
```vue
<template>
	<div class="son">
		<h2>孙组件 —— 祖给的数据：b是{{b}}，c是{{c}}，d是{{d}}，自己的数据：{{gift}}</h2>
		<button @click="$emit('send-gift',gift)">点我给爷爷一个礼物</button>
	</div>
</template>

<script>
	export default {
		name:'Son',
		data() {
			return {
				gift:'奥特曼'
			}
		},
		props:['b','c','d']
	}
</script>
```

------



### 第7种： $refs、$children、$parent

1. 概述：常用与 ：**父→子。**
2. 原理：通过 `this.$refs.child `得到子组件对象, 从而可以直接更新其数据。
| 属性 | 说明 |
| --- | --- |
| `$refs` | 值为对象，包含所有被`ref`属性标识的DOM元素或组件实例。 |
| `$children` | 值为数组，包含所有子组件实例的对象。 |
| `$parent` | 值为对象，当前组件的父组件实例对象。 |

------



### 第8种：provide与inject（了解）

1. 概述：实现祖孙组件间直接通信
2. 具体使用：
   * 在祖组件中通过`provide`配置向后代组件提供数据
   * 在后代组件中通过`inject`配置来声明接收数据

3. 注意：

   > `provide`提供的数据本身不是响应式的 ==> 父组件更新了数据, 后代组件不会变化
   > `provide`提供的数据对象内部是响应式的 ==> 父组件更新了数据, 后代组件也会变化

------



### 第9种：Vuex

1. 概述： 实现任意组件间通信
2. 核心：
   * 任意组件都可以读取到`Vuex`中`store`的`state/getters`数据
   * 任意组件都可以通过`dispatch()`或`commit()`来触发`store`去更新`state`中的数据
   * 一旦`state`中的数据发生变化, 依赖于这些数据的组件就会自动更新

------



### 第10种：插槽 

1. 概述：实现父组件向子组件传递标签内容。

2. 插槽的分类：默认插槽、具名插槽、作用域插槽

3. 什么情况下使用作用域插槽?

   > 数据在自身，但要由父组件决定数据生成的具体结构。

   父组件中：

   ```vue
   <template v-slot="{row, $index}">
       <span>{{$index+1}}</span> &nbsp;&nbsp;
       <span :style="{color: $index%2===1 ? 'blue' : 'green'}" >{{row.text}}</span>
   </template>
   ```

   子组件中：

   ```vue
   <!-- slot的属性会自动传递给父组件 -->
   <slot :row="item" :$index="index"/> 
   ```

   

```
1) 
2) 什么情况下使用作用域插槽?
    父组件需要向子组件传递标签结构内容  ==> 插槽
    但决定父组件传递怎样标签结构的数据在子组件中
3) 编码:
    子组件:
        <slot :row="item" :$index="index"/>  <!-- slot的属性会自动传递给父组件 -->
    父组件:
        <template v-slot="{row, $index}">
            <span>{{$index+1}}</span> &nbsp;&nbsp;
            <span :style="{color: $index%2===1 ? 'blue' : 'green'}" >{{row.text}}</span>
        </template>
4) 应用
	element-ui中绝大部分组件都用了插槽
	element-ui中的 table-column 组件使用了作用域插槽
```



## 三、常见搭配形式

<img src="http://49.232.112.44/images/comm.png" style="zoom: 33%;" /> 
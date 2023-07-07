<template>
  <div class="box">
    <!-- 
    区别原生事件与自定义事件
      原生事件
        原生标签上绑定 / 组件标签上绑定加.native
        事件名是特定的一些
        事件对象 / $event: 包含事件相关信息的数据对象, 如: pageX/pageY/target/keyCode
      自定义事件
        组件标签上绑定(不加.native)
        事件名是任意名称
        事件对象 / $event: $emit分发时指定的数据, 可以是任意类型, 甚至是undefined
    -->
    <h1>组件间通信2: vue自定义事件</h1>
    <h2>原生事件监听</h2>
    <button @click="showMsg1">原生标签,原生DOM事件1</button>
    <button @click="showMsg1($event)">原生标签,原生DOM事件2</button>
    <Event1 @click.native="showMsg1" />
    <hr />
    <h2>自定义事件监听</h2>
    <Event2 @click="showMsg2" @xxx="showMsg3" @increment="increment" />
    <h3>{{count}}</h3>
  </div>
</template>
<script lang="ts">
export default {
  name: 'EventTest'
}
</script>
<script lang="ts" setup>
import { ref } from 'vue'
// 引入两个子级组件
import Event1 from './Event1.vue'
import Event2 from './Event2.vue'
// 原生事件所用的回调
const showMsg1 = (event: MouseEvent) => {
  console.log(event) // 输出事件参数对象
  console.log((event.target as HTMLElement).innerHTML) // 输出事件源标签内容
}
// 自定义事件所需回调(showMsg2和showMsg3和increment)
const showMsg2 = (event: string) => {
  console.log(event)
}
const showMsg3 = (event: object) => {
  console.log(event)
}
const count = ref(10)
const increment = (num: number) => {
  count.value += num
}
</script>

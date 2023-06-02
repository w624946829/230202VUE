<template>
    <div>
        <h4>App组件</h4>
        <hr>
        <!--    原生事件(浏览器触发)    自定义事件(浏览器不认识,认识button标签,不认识xxx事件)-->
        <button @click="clickHandler" @xxx="xxxHandler">按钮</button>
   
        <hr>

        <!--      原生事件(浏览器不认识,不认识mybutton这个标签,认识click也不管用)        自定义事件(自己定义yyy,组件也是自己定义的,在组件内使用$emit触发)    -->
        <mybutton @click="mybutttonClickHandler"                                     @yyy="yyyHandler"></mybutton>
        <!--      把click认为成了和yyy一样的自定义事件,所以需要自己触发,使用$emit -->

        <!--
            @yyy="yyyHandler" 绑定事件, 并告诉这个事件被触发的回调
            this.$emit('yyy') 触发事件,触发的是 yyy 这个事件,在触发这个事件的时候,会执行yyyHandler回调
        -->




        <!-- ---------------------------- -->
        <hr>
        <hr>
        <!--
            加.navtive修饰符,会把像click这种事件变成原生事件,绑定在子组件的根标签上
            问: 像click这种事件,是什么事件?
            这种事件指的是原生的事件类型,例如说: click、mouseenter、mouseleave、.....
            这些事件直接绑在组件上会被理解成自定义事件
            但是加了.native之后,会绑定在子组件的根标签上,变成原生事件
        -->
        <mybutton @click.native="mybutttonClickHandler"  @yyy.native="yyyHandler"></mybutton>
    </div>
</template>

<script>
// 原生事件
//      原生标签 - 绑定原生事件
//          1. 事件类型 - click、mouseenter、mouseleave、keydown、keyup......
//                       总共有几个事件类型?
//                       一定是有限个数的,系统内置好的,我们直接用这个类型即可
//          2. 触发机制
//                      浏览器帮我们触发的
//      组件标签 - 绑定原生事件
//          1. 事件类型 - click...
//          2. 触发机制 - 组件标签上绑定原生事件会被理解成自定义事件
//                       如何触发?
//                       还是使用自定义事件的规则去触发(在子组件中使用$emit触发)
// 自定义事件 - 自己定义的事件叫自定义事件
//      原生标签 - 绑定自定义事件
//          1. 事件类型 - 自己给事件类型起名字
//          2. 触发机制 - 无法触发
//      组件标签 - 绑定自定义事件
//          1. 事件类型 - 自己给事件类型起名字
//          2. 触发机制 - 自己触发(在子组件中自己使用 $emit 触发)
// -------------------------------------
// 自定义事件总结
// 用于父子组件之间传参(子给父传参)
// 使用步骤:
//      1. 在组件标签上绑定 自定义事件(自己起事件名)(绑定事件)
//      2. 在组件内部使用 $emit 触发事件(触发事件2)
// 注意:
//      自定义事件是 $emit 触发自定义事件给父组件传参
//      之前是 props 传函数,在子组件内调用这个函数的地址
//      两种方式是完全不同的
// 关于参数:
//      $emit() 用来触发事件,至少有一个参数
//      参数一: 事件类型
//      参数二: 从参数二开始往后的所有参数,都是要传的参
//      this.$emit('事件类型', 参数A, 参数B, ..., 参数n)
//      参数在被触发的事件回调中直接接收即可
// -------------------------------------
// .native 修饰符
// 加.navtive修饰符,会把像click这种事件变成原生事件,绑定在子组件的根标签上
import mybutton from '@/components/mybutton.vue'
export default {
    name: "App",
    components: { mybutton },
    methods: {
        clickHandler() {
            console.log('触发了点击事件')
        },
        xxxHandler() {
            console.log('xxx触发')
        },
        yyyHandler(param, param2) {
            console.log('yyy触发', param, param2)
        },
        mybutttonClickHandler() {
            console.log('mybutton的click事件')
        }
    }
}
</script>

<style scoped>

</style>
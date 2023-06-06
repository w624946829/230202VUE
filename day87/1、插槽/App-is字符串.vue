<template>
    <div>
      <!-- <Home></Home>
      <Main></Main> -->

    <button @click ="xxx = 'Home'">展示Home</button>
    <button @click ="xxx = 'Main'">展示Home</button>


    <components :is="xxx"></components>
    </div>
  
</template>

<script>

//  * 动态组件渲染
//  * 动态组件使用components组件渲染，这个组件有一个is属性，is的值决定了要展示
//  * is目前放的是字符串，是组件名
//  * 组件名我们注册组件时的名称

import Home from '@/components/Home'
import Main from '@/components/Main'
export default {
    name:"App",
    components:{
        Home,
        Main,
    },
    data(){
        return {
            xxx:'Home'
        }
    }
}
</script>

<style scoped>

</style>
<template>
    <div>
        <!-- <button @click ="xxx = 'Home'">展示Home</button>
    <button @click ="xxx = 'Main'">展示Home</button> -->
        <button @click="xxx = Home">展示Home</button>
        <button @click="xxx = Main">展示Main</button>

        <components :is="xxx"></components>
    </div>
</template>

<script>
//  * 动态组件渲染
//  * 动态组件使用components组件渲染，这个组件有一个is属性，is的值决定了要展示哪个22组件
//  * is目前放的是字符串，是组件名
//      * 组件名我们注册组件时的名称
// is还可以放组件（组件配置项）

import Home from "@/components/Home";//引入的是组件配置项
import Main from "@/components/Main";
export default {
    name: "App",

    data() {
        return {
            Home,
            Main,
            xxx: Home,
        };
    },
};
</script>

<style scoped>
</style>
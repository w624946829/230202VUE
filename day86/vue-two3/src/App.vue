<template>
    <div class="container">
       
        <div
            v-for="item in list"
            :key="item.id"
            v-if="item.isShow"
        >
            {{ item.content }}
        </div>


        <!--
        v-for遍历数字, item是从1开始, index下标是从0开始
        <div
            v-for="(item, index) in 10"
            v-if="false"
            :key="item"
        >
            {{ item }} - {{ index }}
        </div>
        -->
        <!--
        v-for遍历对象, item是属性值  index是属性名
        <div
            v-for="(item, index) in userinfo"
        >
            {{ item }} - {{ index }}
        </div>
        -->
        <hr>
        <Header></Header>
        <Main></Main>
    </div>
</template>

<script>
// 1. 静态搭建
//  拆分组件,拆成Header和Main
//  注意css的拆分
// 2. 初始化数据展示(这里没有需要初始化展示的数据)
// 3. 交互
//    当header组件中点击搜索按钮的时候,拿到input输入内容,发送网络请求,拿到数据在Main组件中循环渲染
//    1. 点击"搜索"按钮,收集到Header组件中input输入的内容
//    2. 发请求
//       问: 在哪发请求(在Header中发请求,在Main中发请求?)
//          在Mian中发请求更好一点,拿到数据可以直接展示
//       在main组件中需要拿到keyword,使用什么拿?
//       使用总线拿,总线就是用来跨组件通信的
//      安装axios,使用axios发请求
//      npm i axios
//      import axios from 'axios'
//      axios.get(``).then(res => {}).catch(err => {})
// ----------------------------------------
// 优化:
// 1. 把.then .catch 改为async和await
// axios 发请求可以使用async和await,为甚?
// 使用async和await优化我们的代码
// 使用async和await的目的是为了解决地狱回调,代码有更强的可读性
// 2. 给页面增加状态
//   状态一: 欢迎页状态
//   状态二: loading 状态
//   状态三: 错误提示状态
//   状态四: 正常展示数据
//   注意:
//      v-if和v-for可以在同一个标签上使用,问: v-if 的优先级高 还是 v-for 的优先级高
//      v-for的优先级更高(在vue2中)
//      v-if 的优先级高(在vue3中)
import Header from '@/components/Header'
import Main from '@/components/Main'
export default {
    name: "App",
    components: {
        Header,
        Main,
    },
    data() {
        return {
            userinfo: {
                uasername: '张三',
                age: 18,
                weight: 180
            },
            list: [
                { id: 1001, content: '抽烟', isShow: true },
                { id: 1002, content: '喝酒', isShow: false },
                { id: 1003, content: '烫头', isShow: true },
            ]
        }
    }
}
</script>

<style scoped>

</style>
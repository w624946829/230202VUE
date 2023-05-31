
<template>
    <div class="box">
        <h5>mybutton组件</h5>
        <div>qwer: {{ qwer }} 次</div>
        <button @click="changeQwer">修改接收到的 qwer</button>

        <div>qwer: {{ msg }} 次</div>
        <button @click="changeMsg">修改msg</button>
        <!-- v-on 的简写是@  用来监听DOM事件 -->

        <button @click="changeMessageHandler">修改父组件的msg</button>
        <hr>
        <div>姓名：{{userinfo.username}}</div>
        <div>年龄：{{userinfo.age}}</div>
        <button @click = "changeUserInfo">修改userinfo</button>
        <div>独立：{{hank}}</div>
    </div>
</template>

<script>
export default {
    name: "mybutton",
    // 1.数组写法
    // props:['qwer'],
    // 2、对象写法
    // props:{
    //     qwer:Number//类型
    // },
    // 3、配置对象写法
    props: {
        qwer: {
            type: Number, //类型
            required: true, //属性必须传递
        },
        msg: {
            type: String,
            default: "八嘎",
            //  required和default 互斥
        },
        userinfo:{
            type: Object,
            //default:{}//报错
            // 这里为什么要写成函数返回值的形式，为什么
            // 和data配置项必须写成函数返回值的形式原理一样，让每一个组件不传该属性的时候
            // 生成的对象地址不一样
            default(){
                return {}
            }
        },
        changeMessage:{
            type:Function,
        },
        hank:{
            
        }
    },
    methods: {
        changeQwer() {
            console.log(this.qwer);
            this.qwer = this.qwer + 1;
        },
        changeMsg() {
            this.msg = this.msg + "你是个好人";
        },
        changeUserInfo() {
            //没改地址，不报错
            this.userinfo.username = this.userinfo.username  + 'Ji'
            //改地址了，草错
            // this.userinfo = {
            //     name:'赵四',
            //     age:40
            // }
        },
         changeMessageHandler() {
            this.changeMessage('燕子')
        }
    },
};
</script>

<style scoped>
.box {
    border: 1px solid #333;
}
</style>
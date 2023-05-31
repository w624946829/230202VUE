
<template>
    <div>
        根组件
        <hr />
        <div> count:{{count}}</div>
        <div> msg:{{ msg }}</div>
        <div> 姓名:{{userinfo.username}}</div>
        <div> 年龄:{{userinfo.age}}</div>
        <mybutton 
        :qwer = "count"
        :msg = "msg"
        :userinfo = "userinfo"
        :changeMessage = "changeMessage"
        :hank="hank"
        ></mybutton>
        <div> 独立:{{hank}}</div>
        <hr>
        <div> msg:{{msg}}</div>
        <br>

        <div>changeMessage:{{changeMessage}} </div>

    </div>
</template>

<script>
//props传参 - 父给子传参
/*
给子组件传参
1、在子组件标签上使用v-bind（简写是":"）绑定属性，设置属性值(属性值可以是js表达式)
2、子组件中需要接受参数，子组件中使用props配置项去接受参数，按绑定在组建标签上的属性名
    接到了既可以进行在子组件中进行展示
    注意：在子组件中接的时候，有三种写法
     1.数组写法
     props:['qwer'],
     2、对象写法
     props:{
         qwer:Number//类型
     },
     3、配置对象写法
    props:{
        qwer:{
            type:Number,//类型
            required:true,//属性必须传递
        }
    },

*/ 
// 注意：
// props传参遵循单向数据流（单向下行的数据流向）的原则
// 按照单向数据流的原则，不允许子组件修改父组件传过来的数据
// 注意：传给子组件对象的时候，传的是地址，子组件在修改的时候
// 不能修改这个对象的地址，但是可以修改对象中的属性
// ！！！不推荐这样使用！！！！因为违反单向数据流原则
// ----------------------------------
// 如果，一定要改父组件串串过来的数据怎么办？
// 在父组件中定义一个方法，把这个方法传递过去，让子组件调用该方法

import mybutton from "./component/mybutton.vue";
export default {
    name: "App",

    components: {
        mybutton,
    },
    data(){
        return {
            count:7,
            msg:'我爱你',
            hank:'你真好',
            userinfo:{
                username:'张三',
                age:18
            }
        }
    },
    mounted(){
        // setInterval(()=>{
        //     this.count += 10
        //     this.box = 'box5'
        // },5000)
    },
    methods:{
        changeMessage(params){
            this.msg = params
        }
    }
    
};
</script>

<style scoped>
</style>
<template>
    <div>
        <button @click="clickHandler">按钮1</button>
        <br />
        <button @click="clickHandler(9527)">按钮2</button>
        <br />
        <button @click="clickHandler(9527, $event)">按钮3</button>

        <h3>这是 父组件</h3>
        <div>username:{{ username }}</div>
        <hr />
        <mycomp @xxx="xxxHandler"></mycomp>
        <hr />
        <mycomp @xxx="xxxHandler('雷')"></mycomp>
        <hr />
        <mycomp @xxx="xxxHandler('雷', $event)"></mycomp>

        <br />
        <hr />
        <br />
        <button ref="btnRef">按钮4</button>

        <!-- $on --> 
        <mycomp ref="mycompRef"></mycomp>

        <hr />

        <!-- $once -->

        <mycomp ref="onceRef"></mycomp>

        <hr />

<!-- $off --> 
<button @click="offCustomeEvent">解绑事件</button>
        <mycomp ref="offRef"></mycomp>

        <hr />
    </div>
</template>

<script>
/**
 * $event
 * 结论：
 * $event 在原生事件中是事件对象
 *        在自定义实践中是参数（自己触发时间时传递的参数）
 *
 * --------------------------------------
 * 除了给标签上绑定事件的形式以外，还有没其他的形式
 * 使用$on
 *
 * */
import mycomp from '@/components/mycomp.vue';
export default {
    name: "App",
    components: { mycomp },
    data() {
        return {
            username: "张三",
        };
    },
    methods: {
        clickHandler(e, param2) {
            console.log(e, param2);
        },
        xxxHandler(text, param2) {
            console.log(text, param2);
            this.username += text;
        },
        xxx2Handler(){
            console.log(222);
        },
        mmmHandler(){
            console.log('mmm自定义事件');
        },
        nnnHandler(){
            console.log('nnn自定义事件');
        },
        offCustomeEvent(){
            this.$refs.offRef.$off('mmm',this.xxx2Handler)//解锁mmm事件对应的xxx2Handler回调
        }

        
    },
    mounted() {
        // 使用原生标签调用$on不好使，报错
        // this.$refs.mycompRef.$on("xxx", () => {
            // console.log(111);
        // });

        // 使用 组件实例调用$on好使，并且可以使用$emit触发事件
        // $on 只能用于组件事件的绑定（绑定的自定义事件）使用$emit触发
        console.log(this.$refs);
        this.$refs.mycompRef.$on('xxx',()=>{
            console.log(111);
        })
// 使用$on绑定事件和之间在组件标签上绑定事件有什么差异？

//在组件标签上使用@绑定事件只能绑定一次
// 在js中使用$refs 获取到的组件实例可以对同一事件绑定多次
this.$refs.mycompRef.$on('xxx',this.xxx2Handler) 

// $once
// 使用$once绑定的事件只能触发一次，触发一次后自动解绑了
this.$refs.onceRef.$once('mmm',this.mmmHandler)

// 手动解绑
this.$refs.offRef.$on('mmm',this.mmmHandler)
this.$refs.offRef.$on('mmm',this.xxx2Handler)
this.$refs.offRef.$on('mmm',this.nnnHandler)

    },
};
</script>

<style scoped>
</style>
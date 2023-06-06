<template>
    <div>
        <h4>App组件</h4>
        <hr />
        <!-- 简写 -->
        <!-- <Child>
        <div class = "text">夏天到了</div>
    </Child> -->
        <!-- 全写 -->
        <Child>
            <template v-slot:default><!-- 没有实际意义-->
                <div class="text">夏天到了</div>
            </template> 

            <template v-slot:qwer>
                <div class="text">烈日炎炎</div>
            </template>

            <template v-slot:abc ="scope">
                <!-- <div class="text">桩基</div> -->
                <div>用户名：{{ scope.asdf.username }}</div>
                <div>日期：{{ scope.asdf.age }}</div>
              
            </template>
        </Child>
        <br/>
        <br/>
        <br/>
        <Child2 #default="{userinfo,intro}">
            <div>用户名：{{userinfo.username}}</div>
            <div>龄期：{{userinfo.age}}</div>
            <div>介绍：{{intro}}</div>

        </Child2>

        
        <!-- 
            存在的问题
            当子组件中开多个槽的时候，组件标签之间会给每个槽中都放上
            解决：、
            具名插槽
            <template v-slot:qwer>
                <div >天气真热</div>
            </template>
            在组件标签之间写的内容加 v-slot指令,:qwer 冒号之后的qwer是插槽的名称
        问题：
            在子组件中由数据，这个数据决定插槽的内容，此次是怎么办
            使用作用于插槽
        作用域插槽
            由子组件的数据决定父组件的模板内容
            slot标签上绑定父组件中需要的的数据
            还可以使用结构复制
            v-slot:abc="{asdf,intro}"
            v-slot 是插槽的张志玲
            ：abc是具名插槽的名称，也就是slot标签上的name属性 
            "{asdf,intro}"是结构复制



        注意：
        v-slot：指令简写成 #
        v：qwer="{userinfo,intro}" 
        #qwer="{userinfo,intro}"
        如果是默认插槽的话，#default = ""  default不能省略
         -->
    </div>
</template>

<script>
//插槽
// 插槽是父子组件之间的异同通信形式，父给子传递 html和css
// 怎么做
// 1\在子组件中使用slot标签中开一个槽,slot标签中的内容默认展示
// 2、在子组件标签之间写的内容会放在槽里面
import Child from "@/components/Child";
import Child2 from "@/components/Child2";
export default {
    name: "App",
    components: { Child, Child2},
};
</script>

<style scoped>
.text {
    color: red;
}
</style>
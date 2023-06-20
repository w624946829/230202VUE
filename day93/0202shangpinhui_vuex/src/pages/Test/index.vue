<!--
 * @Author: 王泽昌 624946829@qq.com
 * @Date: 2023-06-12 08:34:27
 * @LastEditors: 王泽昌 624946829@qq.com
 * @LastEditTime: 2023-06-13 20:58:45
 * @FilePath: \0202shangpinhui\src\pages\Test\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div class="test">
        <h1>我是一一个测试路由</h1>
        <div>{{ name }}</div>
        <button @click="test1">点我使用axios,获取尚品汇前台路由</button>
        <button @click="test2">测试一下mock</button>
    </div>
</template>

<script>
import axios from "axios";
import { reqCategoryList,reqSlideList,reqFloorList } from "@/api";
import { mapState } from "vuex";
export default {
    name: "Test",
    computed: {
        // 查
        ...mapState("user", ["name"]),
    },
    methods: {
        async test1() {
            let result = await reqCategoryList();
            console.log(result);
        },

        async test2() {
            let x1 = await reqSlideList();
            let x2 = await reqFloorList();
            console.log(x1);
            console.log(x2);
        },
    },
};
</script>

<style lang="less" scoped>
.test {
    background-color: pink;
    font-size: 40px;
    padding: 20px;
}
</style>
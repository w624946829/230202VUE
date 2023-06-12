<template>
    <div class="test">
        <h1>我是一一个测试路由</h1>
        <button @click="test1">点我使用axios,获取果核博客</button><br>
        <button @click="test2">点我使用axios,获取尚品汇前台路由</button>
    </div>
</template>

<script>
import axios from 'axios';
import myAxios from '@/api/myAxios'
export default {
    name: "Test",
    methods:{
      async test1() {
        let result = await axios.get ('/ghbk/ghapi?type=query&n=pc')
        console.log(result.data.data);
      },
      async test2() {
        let result = await myAxios.get ('/api/product/getBaseCategoryList')
        console.log(result.data.data);
      }
    }
};
</script>

<style lang="less" scoped>
.test {
    background-color: pink;
    font-size: 40px;
    padding: 20px;
}
</style>
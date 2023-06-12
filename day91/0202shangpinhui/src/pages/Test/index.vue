<!--
 * @Author: 王泽昌 624946829@qq.com
 * @Date: 2023-06-12 08:34:27
 * @LastEditors: 王泽昌 624946829@qq.com
 * @LastEditTime: 2023-06-12 10:21:36
 * @FilePath: \0202shangpinhui\src\pages\Test\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div class="test">
        <h1>我是一一个测试路由</h1>
        <button @click="test1">点我使用axios,获取果核博客</button><br>
        <button @click="test2">点我使用axios,获取尚品汇前台路由</button>
    </div>
</template>

<script>
import axios from 'axios';
import {reqCategoryList} from '@/api'
export default {
    name: "Test",
    methods:{
      async test1() {
        try{
          let result = await axios.get ('/ghbk/ghapi?type=query&n=pc')
        console.log(result.data.data);
        }catch(error){
          alert(error.message)
        }
        
      },
      async test2() {
        let result = await reqCategoryList()
        console.log(result);
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
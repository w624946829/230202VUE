<template>
  <h2>Vue2中可以支出Vue2中大多数的特征</h2>
  <h3>{{ obj }}</h3>
  <button @click="updateObj">更新数据</button>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
// 用来定义组件的，需要传入一个配置对象 --- 暴露出去的就是一个组件对象
export default defineComponent({
  name:'App',
  setup () {
    // 定义一个对象
    // target是目标对象
    const target = {
      name: '藏手机',
      age: 3,
      wife:{
        name:'书本',
        books:['三国演义','水浒传','西游记']
      }
    }
    //obj是代理对象
    const obj = reactive(target)
    // 定义一个方法
    const updateObj=()=>{
      console.log(obj);
      obj.wife.books[1] = '红楼梦'
      console.log('=====');
    } 
    console.log('===',this);
    

    return {
      obj,
      updateObj
    }
  }
})
</script>

<style scoped>

</style>
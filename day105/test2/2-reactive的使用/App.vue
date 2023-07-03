<template>
  <h2>Vue3中可以支持Vu2中大多数的特性</h2>
  <h3>{{ obj }}</h3>
  <button @click="updateObj">更新数据</button>
</template>

<script lang="ts">
import { defineComponent,reactive } from 'vue'

export default defineComponent({
  name:'App',
  setup(){
    const manga = {
      name:'鬼灭之刃',
      year:2019,
      wife:{
        name:'蝶屋敷',
        address:['东京','大阪','京都']
        
      }
    }
    // obj是代理对象
    const obj = reactive(manga)
    const updateObj = ()=>{
      console.dir(obj);
      obj.wife.address[2]='北海道'
      console.log('==========');
      
    }
    console.log('====',this);
    
    return {
      obj,
      updateObj

    }
  }


})
</script>

<style scoped>

</style>
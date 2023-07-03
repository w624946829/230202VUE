<template>
  <h3>{{ obj }}</h3>
  <button @click="updateObj">更新数据</button>
</template>

<script lang="ts">
import { defineComponent,reactive } from 'vue'

export default defineComponent({
  name:'App',

  setup () {
    const shoot ={
      name:'射手',
      type:'物理英雄',
      hero:{
        auxiliary:'蔡文姬',
        companion:['孙尚香','戈娅','后羿']
      }
    }
    const obj = reactive(shoot)
    const updateObj = ()=>{
      console.dir(obj);
      obj.hero.companion[0]='狄仁杰'
      console.log('==========');
      
    }
    console.log('=====',this);
    
    return {
      obj,updateObj
    }
  }
})
</script>

<style scoped>

</style>
<template>
  <h2>computed计算属性</h2>
  <h3>{{ count2 }}</h3>
  <h3>{{ count3 }}</h3>
  <button @click="updateCount">修改数据</button>
</template>

<script lang="ts">
import { defineComponent,ref,computed } from 'vue'

export default defineComponent({
  name:'App',
  setup () {
    const count = ref(10)
    // 计算属性用法1，vue3中computed返回的是ref类型的属性
    const count2 = computed(()=>{
      return count.value + 10
    })
    // 计算属性的用法2
    const count3 = computed({
      get(){
        console.log('进入到了get');
        return count.value * 10
      },
      set(val:number){
        console.log('进入到了set');
        count.value = val 
      }
    })
    // 方法
    const updateCount = () =>{
      count3.value = 1000
    }
    console.log(count2);
    
    return {
      count2,
      count3,
      updateCount
    }
  }
})
// ref用来定义复杂类型的响应式数据影响也是深层次的
</script>

<style scoped>

</style>
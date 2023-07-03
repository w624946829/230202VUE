<template>
  <h2>Vue3中可以支持Vue2中大多数的特性</h2>
  <h3>{{ msg }}</h3>
  
  <button @click="updateMsg">更新数据</button>
</template>

<script lang="ts">
import { defineComponent,ref } from 'vue'

export default defineComponent({
  setup () {
    let msg  = ref(0)
    const updateMsg=()=>{
      msg.value ++
      console.dir(msg)
    }

    return {
      msg,updateMsg
    }
  }
})
</script>

<style scoped>

</style>
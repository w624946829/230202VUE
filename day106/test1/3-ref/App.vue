<template>
  <h2>ref的基本使用</h2>
  <input type="text" ref="inputRef" v-model="xxx">
</template>

<script lang="ts">
import { defineComponent,onMounted,ref, } from 'vue'

export default defineComponent({
  name: 'App',
  setup () {
    const inputRef = ref<HTMLInputElement | null>(null)
    const xxx = ref('sfgas')
    onMounted(()=>{
      // 判断文本框书否存在，如果存在的情况下，自动的获取焦点
      // if(inputRef.value){
      //   inputRef.value.focus()
      // }
      //上或下
      inputRef.value&&inputRef.value.focus()
    })
    return {
      inputRef,

    }
  }
})
</script>

<style scoped>

</style>
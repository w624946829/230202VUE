<template>
  <div>{{count}}</div>
  <button @click="updateCount">修改数据</button>
</template>
<script lang="ts">
// 定义组件并暴露
export default {
  name: 'App'
}
</script>
<script setup lang="ts">
import {ref} from 'vue'
// 定义数据
const count = ref(10)
// 定义方法
const updateCount=()=>{
  count.value+=10
}
</script>

<style scoped>
</style>
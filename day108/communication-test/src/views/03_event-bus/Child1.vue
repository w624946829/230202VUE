<template>
  <div class="box">
    <h2>Child111 component</h2>
    <button @click="clickHandler">给Child2传递数据</button>
  </div>
</template>
<script lang="ts">
export default {
  name: 'Child1'
}
</script>
<script lang="ts" setup>
import emitter from './utils/bus'
// 点击事件的回调
const clickHandler=()=>{
  // 分发时间
  emitter.emit('child2Data',{name:'小甜甜',age:20})
}
</script>
<style scoped>
</style>

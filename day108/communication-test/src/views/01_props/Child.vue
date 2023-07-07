<template>
  <div class="box">
    <h2>Child component</h2>
    <h3>count:{{count}}</h3>
    <button @click="updateCount(20)">更新数据</button>
  </div>
</template>
<script lang="ts">
export default {
  name: 'Child'
}
</script>
<script lang="ts" setup>
interface Props{
  count:number
  updateCount(val: number):void
}
// 接收数据
defineProps<Props>()
</script>
<template>
  <div class="box">
    <h2>Event2组件</h2>
    <button @click="$emit('click','小甜甜')">分发自定义click事件</button><br>
    <button @click="$emit('xxx',{name:'小甜甜',age:20})">分发自定义xxx事件</button><br>
    <button @click="$emit('increment', 5)">分发自定义事件更新父组件数据</button>
  </div>
</template>
<script lang="ts">
export default {
  name: 'Event1'
}
</script>
<script lang="ts" setup>

  // 直接接收父级组件传递过来的自定义事件
  // const emit = defineEmits(['click','xxx','increment'])
  defineEmits<{
    (e:'click',val:string):void
    (e:'xxx',val:object):void
    (e:'increment',val:number):void
  }>()
</script>
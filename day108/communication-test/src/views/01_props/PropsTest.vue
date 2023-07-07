<template>
  <div class="box">
    <h1>组件间通信1: props</h1>
    <h3>count:{{count}}</h3>
    <button @click="updateCount(10)">更新数据</button>
    <hr>
    <Child :count="count" :updateCount="updateCount" />
  </div>
</template>
<script lang="ts">
export default {
  name: 'PropsTest'
}
</script>
<script lang="ts" setup>
import {ref} from 'vue'
import Child from './Child.vue'
const count = ref(0)
const updateCount=(num: number)=>{
  count.value+=num
}
</script>

<template>
  <div class="box">
    <h1>组件间通信5: sync属性修改符,Vue3中已经移除了.sync</h1>
    <p>小明的爸爸现在有{{total}}元</p>
    <h2>1. 不使用sync修改符</h2>
    <Child1 :money="total" @update:money="total=$event" />
    <p>{{total}}</p>
    <h2>2.使用v-model修改符</h2>
    <Child2 v-model:total="total" />
     <h2>3. 使用sync修改符</h2>
    <Child3 :money.sync="total" />
  </div>
</template>
<script lang="ts">
export default {
  name: 'SyncTest'
}
</script>
<script lang="ts" setup>
import { ref } from 'vue'
import Child1 from './Child1.vue'
import Child2 from './Child2.vue'
import Child3 from './Child3.vue'
const total = ref(1000)
const title = ref(10000)
</script>
<style scoped>
</style>
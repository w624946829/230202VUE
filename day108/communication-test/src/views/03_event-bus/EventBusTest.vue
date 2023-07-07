<template>
  <div class="box">
    <h1>组件间通信3: 全局事件总线</h1>
    <Child1 />
    <Child2 />
    <hr />
    <Child3 />
    <Child4 />
  </div>
</template>
<script lang="ts">
export default {
  name: 'EventBusTest'
}
</script>
<script lang="ts" setup>
import Child1 from './Child1.vue'
import Child2 from './Child2.vue'
import Child3 from './Child3.vue'
import Child4 from './Child4.vue'
</script>
<style scoped>
</style>


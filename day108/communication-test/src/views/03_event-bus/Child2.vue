<template>
  <div class="box">
    <h2>Child222 component</h2>
    <h3>传过来的数据:{{user.data}}</h3>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Child2'
}
</script>
<script lang="ts" setup>
import emitter from './utils/bus'
import { onBeforeUnmount, reactive } from 'vue'
interface User {
  name: string
  age: number
}
const user = reactive<{ data: User }>({
  data: {} as User
})
// 绑定事件
emitter.on('child2Data', (data: User) => {
  user.data = data
})
// 组件销毁前
onBeforeUnmount(()=>{
  emitter.off('child2Data')
})
</script>
<style scoped>
</style>
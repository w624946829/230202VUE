<template>
  <h2>pinia的基本使用</h2>
  <CountShow />
  <UserShow/>
</template>
<script lang="ts">
export default {
  name: 'App'
}
</script>
<script lang="ts" setup>
// 引入组件
import CountShow from './components/CountShow.vue'
import UserShow from './components/UserShow.vue'
</script>
<style scoped>
</style>
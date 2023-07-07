<template>
  <h2>pinia的基本使用</h2>
  <CountShow/>
  <hr>
  <Trademark/>
  <hr>
  <UserShow/>
</template>
<script lang="ts">
export default {
  name: 'App'
}
</script>
<script lang="ts" setup>
  import CountShow from './components/CountShow.vue'
  import Trademark from './components/Trademark.vue'
  import UserShow from './components/UserShow.vue'
</script>
<style scoped>
</style>
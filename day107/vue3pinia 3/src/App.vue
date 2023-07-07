<template>
<h2>pinia 的基本使用</h2>
<Countshow/>
<hr>
<UserShow/>
<hr>
<Trademark/>
</template>
<script lang="ts">
export default {
  name: 'App'
}
</script>
<script lang="ts" setup>
import Countshow from './components/CountShow.vue'
import UserShow from './components/UserShow.vue'
import Trademark from './components/Trademark.vue'

</script>
<style scoped>
</style>
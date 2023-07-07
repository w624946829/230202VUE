<template>
  <h2>About页面</h2>
  <ul class="nav nav-tabs">
    <li>
      <router-link to="/about/news">News</router-link>
    </li>
    <li>
      <router-link to="/about/message">Message</router-link>
    </li>
  </ul>
 <router-view ></router-view>
</template>
<script lang="ts">
export default {
  name: 'About'
}
</script>
<script lang="ts" setup>
</script>
<style scoped>
</style>
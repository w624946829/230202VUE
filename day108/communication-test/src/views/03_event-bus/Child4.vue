<template>
  <div class="box">
    <h2>Child4 component</h2>
    <button @click="PubSub.publish('updateMsg','狗蛋')">更新兄弟组件数据</button>
  </div>
</template>
<script lang="ts">
export default {
  name: 'Child4'
}
</script>
<script lang="ts" setup>
import PubSub from 'pubsub-js'

</script>
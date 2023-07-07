<template>
  <div class="box">
    <span>小明每次花200元</span>
    <button @click="$emit('update:total',total-200)">花爸爸的钱</button>
    , 爸爸还剩 {{total}}元
  </div>
</template>
<script lang="ts">
export default {
  name: 'Child2'
}
</script>
<script lang="ts" setup>
const emit=defineEmits(['update:total'])
const props = defineProps(['total'])
</script>
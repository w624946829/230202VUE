<template>
  <div class="box">
    <span>小明每次花100元</span>
    <button @click="spendMoney(100)">花钱</button>
    爸爸还剩 {{money}} 元
  </div>
</template>
<script lang="ts">
export default {
  name: 'Child2'
}
</script>
<script lang="ts" setup>
interface Props {
  money: number
}
// 获取props对象
const props = defineProps<Props>()
// 获取分发事件的对象
const emit = defineEmits(['update:money'])
const spendMoney = (count) => {
  emit('update:money', props.money - count)
}
</script>

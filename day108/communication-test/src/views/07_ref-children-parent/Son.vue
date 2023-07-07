<template>
  <div class="box">
    <h3>儿子小明: 有存款: {{money}}</h3>
    <button @click="giveMoney(50,$parent)">给BABA钱: 50</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Son'
})
</script>
<script lang="ts" setup>
import { ref } from 'vue'
const money = ref(30000)
// 借钱方法
const borrowMoney = (num: number) => {
  money.value -= num
}
// 给钱方法
const giveMoney = (num: number, parent: any) => {
  parent.receiveMoney(num)
  money.value -= num
}
// 暴露出去
defineExpose({
  borrowMoney
})
</script>
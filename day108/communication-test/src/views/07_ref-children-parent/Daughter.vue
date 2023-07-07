<template>
  <div class="box">
    <h3>女儿小红: 有存款: {{money}}</h3>
    <button @click="giveMoney(100,$parent)">给BABA钱: 100</button>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
export default defineComponent({
  name: 'Daughter'
}) 
</script>
<script lang="ts" setup>
import { ref } from 'vue'
const money = ref(20000)
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
<template>
  <div class="box">
    <h1>组件间通信7: $ref & $children & $parent</h1>

    <p>BABA有存款: {{money}}</p>
    <button @click="borrowMoney1(100)">找小明借钱100</button><br>
    <button @click="borrowMoney2(150)">找小红借钱150</button><br>

    <br>
    <Son ref="sonRef" />

    <br>
    <Daughter ref="dauRef" />
  </div>
</template>

<script lang="ts">
export default {
  name: 'ChildrenParentTest'
}
</script>
<script lang="ts" setup>
import Son from './Son.vue'
import Daughter from './Daughter.vue'
import { ref } from 'vue'
const money = ref(1000)
// 获取子级组件
const sonRef = ref<InstanceType<typeof Son> | null>(null)
const dauRef = ref<InstanceType<typeof Daughter> | null>(null)
// 借钱方法1
const borrowMoney1 = (num) => {
  ;(sonRef.value as any)?.borrowMoney(num)
  money.value += num
}
// 借钱方法2
const borrowMoney2 = (num: number) => {
  ;(dauRef.value as any)?.borrowMoney(num)
  money.value += num
}
const receiveMoney = (num: number) => {
  money.value += num
}
// 向外暴露组件内的方法
defineExpose({
  receiveMoney
})
// const borrowMoney1 = (num: number) => {
//   sonRef.value?.borrowMoney(num)
//   money.value += num
// }
// const borrowMoney2 = (num: number) => {
//   dauRef.value?.borrowMoney(num)
//   money.value += num
// }
// // 要钱的方法
// const receiveMoney = (num) => {
//   money.value += num
// }
// // 暴露出去方法
// defineExpose({
//   receiveMoney
// })
</script>


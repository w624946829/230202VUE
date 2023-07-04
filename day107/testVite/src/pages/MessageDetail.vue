<template>
  <ul>
    <li>ID:{{route.params.id}}</li>
    <li>TITLE:{{state2.detail.title}}</li>
    <li>CONTENT:{{state2.detail.content}}</li>
  </ul>
</template>
<script lang="ts">
export default {
  name: 'MessageDetail'
}
</script>
<script lang="ts" setup>
// 引入路由信息对象
import { useRoute } from 'vue-router'
import { onMounted, reactive, watch } from 'vue'
// 定义接口
interface MessageDetail {
  id: number
  title: string
  content: string
}
// 定义数组
const messageDetails: MessageDetail[] = [
  { id: 1, title: 'messageDetail001', content: 'content001' },
  { id: 2, title: 'messageDetail002', content: 'content002' },
  { id: 3, title: 'messageDetail003', content: 'content003' }
]

// 获取路由信息对象
const route = useRoute()

// 定义一个对象
// const state1 = reactive({
//   detail: {} as MessageDetail
// })
const state2 = reactive<{ detail: MessageDetail }>({
  detail: {} as MessageDetail
})

// 页面挂载后的钩子
onMounted(() => {
  // 先把字符串类型的数据转数字类型
  const id = +route.params.id
  state2.detail = messageDetails.find((item) => item.id === id) as any
})
// 监视
watch(
  () => route.params,
  () => {
    const id = +route.params.id
    state2.detail = messageDetails.find((item) => item.id === id) as any
  }
)

// function f1(x:number):number{
//   return 10
// }
// function f2<T>(y:T):T{
//   return y
// }
</script>
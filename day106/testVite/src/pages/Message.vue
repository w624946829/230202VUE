<template>
  <ul>
    <li v-for="(m,index) in messages" :key="m.id">
      <!--拼接字符串的方式传递路由的参数-->
      <!-- <router-link :to="`/about/message/detail/${m.id}`">{{m.title}}</router-link> -->
      <!--对象的方式传递路由参数-->
      <router-link :to="{name:'detail',params:{id:m.id}}">{{m.title}}</router-link>
      --- <button @click="pushShow(m.id)">push查看</button>
      --- <button @click="replaceShow(m.id)">replace查看</button>
    </li>
  </ul>
  <button @click="router.back()">返回</button>
  <button @click="router.forward()">前进</button>
  <router-view></router-view>
</template>
<script lang="ts">
export default {
  name: 'Message'
}
</script>
<script lang="ts" setup>
// 引入ref和onMounted
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
// 最终有一个数组,数组中有三个对象,每个对象中有id和title属性
// 定义接口,约束对象中的数据
interface Message {
  id: number
  title: string
}
// 定义一个空数组
const messages = ref<Message[]>([])
// 页面加载完毕后,数组中有三个数据(三个对象)
onMounted(() => {
  setTimeout(() => {
    messages.value = [
      { id: 1, title: 'message001' },
      { id: 2, title: 'message002' },
      { id: 3, title: 'message003' }
    ]
  }, 1000)
})

// 获取路由器对象
const router = useRouter()
// push
const pushShow = (id: number) => {
  // router.push(`/about/message/detail/${id}`)
  router.push({ name: 'detail', params: { id } })
}
// replace
const replaceShow = (id: number) => {
  router.replace(`/about/message/detail/${id}`)
  // router.replace({ name: 'detail', params: { id } })
}
</script>
<style scoped>
</style>
<template>
  <ul>
    <li v-for="(m,index) in messages" :key="m.id">
      <!-- <router-link :to="`/about/message/detail/${m.id}`">{{ m.title }}</router-link> -->
      <!-- 对象的方式 -->
      <router-link :to="{
        name:'detail',
        params:{
          id:m.id
        }
      }">{{ m.title }}</router-link>

      <!-- 编程式 -->
      <button @click="pushShow(m.id)">push的方法查看</button>
      <button @click="replaceShow(m.id)">replace的方法查看</button>


      <button @click="router.back()">返回</button>
      <button @click="router.forward()">前进</button>
    </li>
  </ul>
  <router-view></router-view>
</template>
<script lang="ts">

export default {
  name: 'Message'
}
</script>
<script lang="ts" setup>
import {useRouter} from 'vue-router'

import {ref,onMounted} from 'vue'
// 通过interface来限制对象中的数据 --- 定义对象的数据类型
interface Message{
  id:number,
  title:string
}

// 定义一个空数组
const messages = ref<Message[]>([])
// 挂载生命周期钩子
onMounted(()=>{
  setTimeout(()=>{
    messages.value=[
      {id:1,title:'message1'},
      {id:2,title:'message2'},
      {id:3,title:'message3'},

    ]
  },1000)

})
// 获取路由器对象
const router = useRouter()
// 路由跳转
const pushShow = (id)=>{
  // 字符串的方法
  // router.push(`/about/message/detail/${id}`)
// 对象的形式
  router.push({
    name:'detail',
    params:{
      id
    }
  })
}
const replaceShow = (id)=>{
  // 字符串的方法
  // router.replace(`/about/message/detail/${id}`)
  // 对象的形式
  router.replace({
    name:'detail',
    params:{
      id
    }
  })
}
</script>
<style scoped>
</style>
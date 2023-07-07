<template>
  <ul>
    <li v-for="(m,index) in messages" :key="m.id">
     <router-link :to="{name:'detail',params:{id:m.id}}">{{ m.title }}</router-link>
        <button @click="pushShow(m.id)"> push的方式查看</button>
        <button @click="replaceShow(m.id)"> replace的方式查看</button>
    
    </li>
  </ul>
  <router-view ></router-view>
  <button @click="router.back()">返回</button>
  <button @click="router.forward()">前进</button>
</template>
<script lang="ts">
export default {
  name: 'Message'
}
</script>
<script lang="ts" setup>
import {ref,onMounted} from 'vue'
import {useRouter} from 'vue-router'
interface Message {
  id:number
  title:string
}
const messages = ref <Message[]>([])
onMounted(()=>{
  setTimeout(()=>{
    messages.value = [
      {id:1,title:'message001'},
      {id:2,title:'message002'},
      {id:3,title:'message003'}
    ]
  },1000)
})
const router = useRouter()

const pushShow = (id)=>{
  router.push({name:'detail',params:{id}})
}

</script>
<style scoped>
</style>
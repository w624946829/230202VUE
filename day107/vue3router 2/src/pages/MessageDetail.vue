<template>
  <ul>
   <li>id:{{ props.id }}</li>
   <li>id:{{ state2.detail.id }}</li>
   <li>id:{{ route.params.id }}</li>
   <li>title:{{ state2.detail.title }}</li>
   <li>content:{{ state2.detail.content }}</li>
  </ul>
</template>
<script lang="ts">
export default {
  name: 'MessageDetail'
}
</script>
<script lang="ts" setup>
import {onMounted,watch,reactive,} from 'vue'
import {useRoute} from 'vue-router'
const props = defineProps(['id'])
const route = useRoute()
interface MessageDetail{
  id:number
  title:string
  content:string
}
const messageDetails = reactive<MessageDetail[]>([
  {id:1,title:'message001',content:'content001'},
  {id:2,title:'message002',content:'content002'},
  {id:3,title:'message003',content:'content003'}
])
const state2 = reactive<{detail:MessageDetail|undefined}>({
  detail:{} as MessageDetail
})
onMounted(()=>{
  const id = +route.params.id
  state2.detail = messageDetails.find(item=>item.id === id)
})
watch(()=>route.params,()=>{
  const id = +route.params.id
  state2.detail = messageDetails.find(item=>item.id === id)
})
</script>
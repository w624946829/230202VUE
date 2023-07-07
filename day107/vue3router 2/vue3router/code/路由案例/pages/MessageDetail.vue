<template>
  <ul>
   <li>id:{{ state2.detail.id }}</li>
   <li>id:{{ route.params.id }}</li>
   <li>tittle:{{  }}</li>
   <li>content:{{  }}</li>
  </ul>
</template>
<script lang="ts">
  export default {
    name: 'MessageDetail'
  }
</script>
<script lang="ts" setup>
import {onMounted,watch,reactive,ref} from 'vue'
import {useRoute} from 'vue-router'
// 用来接收父级组件传递过来的props数据（可以用来接收路由跳转传递过来的params的参数）
const props = defineProps(['id'])

// 路由信息对象
const route = useRoute()
// 获取路由器对象
// const router = useRouter()
// 通过interface定义对象的数据类型
interface MessageDetail{
  id:number
  title:string
  content:string
}
// 定义一个数组数据
// const messageDetails:MessageDetail[]=reactive([
// {
//   id:1,
//   title:'messageDetail001',
//   content:'content1的内容'
// },
// {
//   id:2,
//   title:'messageDetail002',
//   content:'content2的内容'
// },
// {
//   id:3,
//   title:'messageDetail003',
//   content:'content3的内容'
// },
// ])

const messageDetails = reactive<MessageDetail[]>([
{
  id:1,
  title:'messageDetail001',
  content:'content1的内容'
},
{
  id:2,
  title:'messageDetail002',
  content:'content2的内容'
},
{
  id:3,
  title:'messageDetail003',
  content:'content3的内容'
},
])



// 定义一个对象，用来进行数据查找后的结果的存储
// const state1 = ref({
//   messageDetail: {} as MessageDetail
// })
// const state1 = ref<MessageDetail|undefined>({} as MessageDetail)
  const state2 = reactive<{detail:MessageDetail|undefined}>({detail:{} as MessageDetail})

// 挂载的生命周期钩子，里面要获取路由跳转传递过来的params的参数
onMounted(()=>{
  // console.log(route.params.id)
  const id = +route.params.id
  // state1.value= messageDetails.find(item=>item.id===id)
  state2.detail= messageDetails.find(item=>item.id===id)

})
// 监视路由信息对象
watch(
  ()=>route.params,
  ()=>{
  const id = route.params.id //字符串类型的数据
  console.log(id);
   
})



</script>
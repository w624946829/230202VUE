<template>
  <div class="box">
    <h2>Child333 component</h2>
    <h3>msg:{{msg}}</h3>
  </div>
</template>
<script lang="ts">
export default {
  name: 'Child3'
}
</script>
<script lang="ts" setup>
import PubSub from 'pubsub-js'
import {ref,onMounted,onBeforeUnmount} from 'vue'
const msg = ref('abc')
onMounted(()=>{ // 组件挂载后
  // 订阅消息
  PubSub.subscribe('updateMsg',(msgName,data)=>{
    msg.value += data
  })
})
onBeforeUnmount(()=>{ // 组件销毁前
  PubSub.unsubscribe('updateMsg') // 取消订阅
})
</script>
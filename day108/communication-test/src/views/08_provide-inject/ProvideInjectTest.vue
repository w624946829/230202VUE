<template>
  <div class="box">
    <h1>组件间通信8: provide + inject</h1>
    <h3>content1:{{state.content1}}</h3>
    <button @click="updateContent('==')">更新content1数据</button>
    <hr>
    <h3>content2:{{state.content2}}</h3>
    <button @click="state.content2={name:'大美丽',age:30}">更新content2对象数据</button>
    <button @click="state.content2.name+='++++'">更新content2名字数据</button>
    <h2>祖组件标题</h2>
    <Child />
  </div>
</template>

<script lang="ts">
export default {
  name: 'ProvideInjectTest'
}
</script>
<script lang="ts" setup>
import Child from './Child.vue'
import { provide, reactive } from 'vue'
const state = reactive({
  content1: 'abc',
  content2: {
    name: '小甜甜',
    age: 20
  }
})
const updateContent = (msg: string) => {
  state.content1 += msg
}
provide('content11', state.content1)
provide('content22', state.content2)
provide('updateContent1', updateContent)
</script>
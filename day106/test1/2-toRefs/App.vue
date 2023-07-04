<template>
  <h2>roRefs的使用</h2>
  <!-- <h3>名字:{{state1.name}}</h3>
  <h3>年龄：{{state1.age}}</h3> -->
  <hr>
  <h3>名字:{{name}}</h3>
  <h3>年龄：{{age}}</h3>
  <hr>
   <!-- <h3>名字:{{state2.name}}</h3>
  <h3>年龄：{{state2.age}}</h3> -->
  <button @click="updateState">更新数据</button>
</template>

<script lang="ts">
import { defineComponent,reactive,toRefs } from 'vue'

export default defineComponent({
  name: 'App',
  setup () {
    // 普通对象
    const obj = {
      name: '张三',
      age:35
    }

    // 响应式的对象数据
    const state1 = reactive(obj)

    // 使用了toRefs进行包裹的对象
    const state2 = toRefs(state1)
    const updateState=()=>{
      // const {name,age} = state1,
      // console.log(name,age);
      // state1.name += '======'
      
      state2.name.value += '======'
      console.log(state2);
      console.log('=======');
      
      
    }
    return {
      // state1, //是响应式的
      // ...state1,   //不是响应式的
      // state2 ,  //是普通对象（对象中的属性是响应式的）
      ...state2,
      updateState,
    }
  }
})
</script>

<style scoped>

</style>
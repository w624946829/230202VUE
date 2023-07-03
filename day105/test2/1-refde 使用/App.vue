<template>
  <h2>Vue3中可以支持Vue2中大多数的特性</h2>
  <h3>{{ arr }}</h3>
  <h3>{{ showArr() }}</h3>
  <h3>{{ msg }}</h3>
  <button @click="updateMsg">更新数据</button>
</template>

<script lang="ts">
import { defineComponent,ref } from 'vue'

export default defineComponent({
  name:'App',
  beforeCreate(){
    console.log('第一个生命周期钩子，beforeCreate');
  },
  // vue2中定义状态数据，响应式数据
  data(){
    return{
      arr:'prprprppr'
    }
  },
  // vue2中定义方法的写法
  methods:{
    showArr(){
      console.log('arr的内容是',this.arr);
      
    }
  },
  // vue3中组合api的入口
  setup () {
    
    let msg  = ref(0)

    const updateMsg=()=>{
      msg.value ++
      console.dir(msg)
    }
    return {
      msg,
      updateMsg
    }
  }
})
</script>

<style scoped>

</style>
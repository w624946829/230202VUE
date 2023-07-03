<template>
  <h2>Vue3中可以支持Vue2中大多数的特性</h2>
  <h3>{{ msg1 }}</h3>
  <h3>{{ msg2 }}</h3>
  <button @click="showMsg">测试</button>
</template>

<script lang="ts">
import { defineComponent,ref } from 'vue'

export default defineComponent({
  name:'App',
  data(){
    return{
      msg1:'四月是你的谎言',
      // msg3:'三月的狮子'
    }
  },
  methods:{
    showMsg(){
      console.log(this.msg3);
      this.test1();
      this.test2();
      
    },
    test2(){
      console.log('test2的方法');
      

    }
  },
  setup () {
      
      const msg2 = ref('火影忍者')
      const msg3 = ref('三月的狮子')
      const test1=()=>{
        console.log('test1的方法');
        
      }

    return {
      msg2,msg3,test1
    }
  }
})
</script>

<style scoped>

</style>
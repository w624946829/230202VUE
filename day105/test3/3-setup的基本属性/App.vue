<template>
  <h3>{{ gossip1 }}</h3>
  <h3>{{ gossip2 }}</h3>
  <h3>{{ gossip3 }}</h3>
  <button @click="showGossip">测试</button>
</template>

<script lang="ts">
import { defineComponent,ref } from 'vue'

export default defineComponent({
  name:'App',
  data(){
    return{
      gossip1:'鬼灭之刃',
    }
  },
  methods:{
    showGossip(){
      console.log(this.gossip2);
      this.test1();
      this.test2();
    },
    test2(){
      console.log('test2的方法');
    }
  },
  
  setup () {
    const gossip2 = ref('柯南')
    const gossip3 = ref('火影忍者-疾风传')
    const test1 = ()=>{
      console.log('test1的方法');
      
    }
    return {
      gossip2,
      gossip3,test1
    }
  }
})
</script>

<style scoped>

</style>
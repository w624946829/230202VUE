<template>
  <h2>生命周期钩子</h2>
 
</template>

<script lang="ts">

import { 
  defineComponent,
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted
} from 'vue'

export default defineComponent({
  name: 'App',
  beforeCreate(){
    console.log('vue2中的。。。beforeCreate');
  },
  created(){
    console.log('vue2中的。。。created'); 
  },
  beforeMount(){
    console.log('vue2中的。。。beforeMount');
    
  },
  mounted(){
    console.log('vue2中的。。。mounted');
    
  },
  beforeUpdate(){
    console.log('vue2中的。。。beforeUpdate');
    
  },
  updated(){
    console.log('vue2中的。。。updated');
    
  },
  onBeforeUnmount(){
    console.log('vue2中的。。。beforeDestory');
    
  },
  onUnmounted(){
    console.log('vue2中的。。。destroyed');
    
  },

  setup () {
    onBeforeMount(()=>{
      console.log('vue3中的。。。onBeforeMount');
      
    })
    onMounted(()=>{
      console.log('vue3中的。。。onMounted1');
      
    })
    onMounted(()=>{
      console.log('vue3中的。。。onMounted2');
      
    })
    onBeforeUpdate(()=>{
      console.log('vue3中的。。。onBeforeUpdate');
      
    })
    onUpdated(()=>{
      console.log('vue3中的。。。onUpdated');
      
    })
    onBeforeUnmount(()=>{
      console.log('vue3中的。。。onBeforeUnmount');
      
    })
    onUnmounted(()=>{
      console.log('vue3中的。。。onUnmounted');
      
    })
    console.log('setup执行了');
    

    return {}
  }
})
</script>

<style scoped>

</style>
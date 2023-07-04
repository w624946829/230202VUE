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
    onUnmounted,
   } from 'vue'
   
  //  定义组件并暴露
  export default defineComponent({
    name: 'App',
    // vue3中也支持vue2的生命周期的，但是beforeDestory和destroyed被废弃了
    beforeCreate(){
      console.log('vue2中的。。。beforeCreate');
    },
    created(){
      console.log('vue2中的。。。created');
    },
    beforeMount(){
      console.log('vue2中的。。beforeMount');
    },
    mounted(){
      console.log('vue2中的。。。mounted');
    },
    onBeforeUnmount(){
      console.log('vue2中的。。。onBeforeUnmount');
    },
    onUnmounted(){
      console.log('vue2中的...destroyed');
    },
    setup(){
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
        console.log('vue3中的...onUnmounted');
      })
      console.log('setup执行了');
      return {}

    }
  })
// vue3中的是支持vue2中的生命周期钩子的，vue2中的beforeDestroy和destroyed两个生命周期钩子在vue3中已经被替换为
// onBeforeUnmount和onUnmounted,vue3中的生命周期钩子都是组合API，需要先引入再使用，vue2中的生命周期钩子每个只能使用一次，
// vue3中的生命周期钩子可以使用多从，vue2中的生命周期钩子是方法，vue3中的生命周期钩子需要传入回调函数
// vue2中的生命周期钩子一共是11个，vue3中是12+1（setup），vue3中的生命周期钩子的执行时机遭遇vue2队形的生命周期钩子


</script>

<style scoped>

</style>
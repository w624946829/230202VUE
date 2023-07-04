<template>
  <div>

  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',
  setup () {
    beforecreate(){
      console.log('beforecreate');
      
    },


    return {}
  }
})

// vue3中是支持vue2中的，vue2中的beforeDestory，和destroyed两个生命周期在vue3中已经替换成了
// onBeforeUnmounrt和onUnmounted c
</script>

<style scoped>

</style>
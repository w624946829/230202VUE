<template>
  <h2>computed计算属性</h2>
  <h3>{{count2}}</h3>
  <h3>{{count3}}</h3>
  <button @click="updateCount">修改数据</button>
</template>

<script lang="ts">
import { computed, defineComponent,ref } from 'vue'

export default defineComponent({
  name:'App',
  setup () {
    const count = ref(10)
    const count2 = computed(()=>{
      return count.value + 10
    })

    const count3 = computed({
      get() {
        console.log('进入到了get')
        return count.value * 10
      },
      set(val: number) {
        console.log('进入到了set')
        count.value = val
      }
    })
    const updateCount = ()=>{
      count3.value = 1000
    }
    console.log(count2);
    
    return {
      count2,
      count3,
      updateCount
    }
  }
})
</script>

<style scoped>

</style>
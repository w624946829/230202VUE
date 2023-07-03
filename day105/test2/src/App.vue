<template>
  <h2>computed计算属性</h2>
  <h3>{{ buffer2 }}</h3>
  <h3>{{ buffer3 }}</h3>
  <button @click="updateBuffer" > 修改数据</button>
</template>

<script lang="ts">
import { defineComponent,ref,computed } from 'vue'

export default defineComponent({
  name:'App',

  
  setup () {
    const buffer = ref(10)
    const buffer2 = computed(()=>{
      return buffer.value + 10
    })  
// 用法2
const buffer3 = computed({
  get(){
    console.log('进入到get');
    return buffer.value * 10
  },
  set(val:number){
    console.log('进入到set');
    buffer.value = val
  }
})
// 方法
const updateBuffer = ()=>{
buffer3.value = 1000
}
console.log(buffer2);

    return {
      buffer2,
      buffer3,
      updateBuffer
    }
  }
})
</script>

<style scoped>

</style>
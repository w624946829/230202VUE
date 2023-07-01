<template>
  <div class="index">
    <h3>父组件</h3>
    <Child1/>
    <Child2/>
  </div>
</template>

<script>
import Child1 from './Child1.vue'
import Child2 from './Child2.vue'

export default {
  name: 'Index',
  components: {Child1,Child2}
}
</script>

<style scoped>
  .index{
    background-color: rgb(165, 165, 165);
    padding: 20px;
    border-radius: 10px;
  }
</style>

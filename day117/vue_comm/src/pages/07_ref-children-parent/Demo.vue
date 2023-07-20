<template>
  <div class="demo">
    <Child1/>
  </div>
</template>

<script>
  import Child1 from './Child1.vue'

  export default {
    name:'Demo',
    components:{Child1}
  }
</script>

<style lang="less" scoped>
  .demo {
    background-color: pink;
  }
</style>
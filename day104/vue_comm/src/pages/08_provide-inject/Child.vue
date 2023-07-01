<template>
  <div class="child">
    <h3>我是子组件</h3>
    <GrandChild/>
  </div>
</template>

<script>
  import GrandChild from './GrandChild'
  
  export default {
    name:'Child',
    components:{GrandChild}
  }
</script>

<style lang="less" scoped>
  .child {
    background-color: skyblue;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px black;
  }
</style>
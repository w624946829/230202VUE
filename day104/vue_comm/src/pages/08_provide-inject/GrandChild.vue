<template>
  <div class="grand-child">
    <h3>我是孙组件</h3>
  </div>
</template>

<script>
  export default {
    name:'GrandChild',
  }
</script>

<style lang="less" scoped>
  .grand-child{
    background-color: orange;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px black;
  }
</style>
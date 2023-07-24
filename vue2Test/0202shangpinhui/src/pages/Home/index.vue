<template>
  <div>
    <!-- 三级分类导航区 -->
    <TypeNav/>
    <!-- 轮播图+右侧区域 -->
    <ListContainer/>
  </div>
</template>

<script>
import TypeNav from './TypeNav'
import ListContainer from './ListContainer'
  export default {
    name:'Home',
    components:{
      TypeNav,ListContainer
    }
  }
</script>

<style lang="less" scoped>
  h1{
    background-color: hotpink;
    height: 300px;
  }
</style>
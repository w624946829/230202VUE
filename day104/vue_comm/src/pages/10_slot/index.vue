<template>
  <div class="index">
    <h3>父组件</h3>
  </div>
</template>

<script>
  export default {
    name:'Index',
    data() {
      return {
        todos:[
          {id:'98ej98dsahd2',title:'吃饭',done:true},
          {id:'98ej98dsahd3',title:'睡觉',done:false},
          {id:'98ej98dsahd4',title:'学习',done:true},
          {id:'98ej98dsahd5',title:'打台球',done:false}
        ]
      }
    },
  }
</script>

<style lang="less" scoped>
  .index {
    background-color: rgb(165, 164, 164);
    padding: 20px;
    border-radius: 10px;
  }
</style>
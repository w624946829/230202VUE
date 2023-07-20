<template>
  <div class="box">
    <h3>父组件- 我有一个sum值是：{{ he }}</h3>
    <button @click="he += 1 ">点我he+1 </button>
    <Child :sum.sync = "he"/>
    <Child :sum="he" @update:sum = "he = $event"/>
  </div>
</template>

<script>
  import Child from './Child'

  export default {
    name: 'Index',
		components: {Child},
    data() {
      return {
        he: 0
      }
    }
  }
</script>

<style scoped>
	.box{
		background-color:rgb(165, 164, 164);
		padding: 20px;
    border-radius: 10px;
	}
</style>

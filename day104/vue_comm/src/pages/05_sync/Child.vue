<template>
  <div class="child1">
		<h3>子组件 -- 我的父组件递给我的he值是：{{ he }}</h3>
    <button @click="$emit('update:sum',he + 1 )">点我触发a事件</button>
  </div>
</template>

<script>
  export default {
    name: 'Child',
    props: ['he'],
  }
</script>

<style scoped>
	.child1{
		margin-top: 20px;
		background-color: skyblue;
		padding: 20px;
		margin-bottom: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px black;
	}
</style>


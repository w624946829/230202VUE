<template>
  <div class="box1">
    <h2>我是孩子组件1---- 父给我绑定了一个add-sum自定义事件</h2>
	<button @click="$emit('add-sum',6)">点我触发身上的add-sum事件</button>
  </div>
</template>

<script>
	export default {
		name:'Child1',
	
	
	}
</script>

<style lang="less" scoped>
	.box1{
		margin-top: 50px;
		background-color: skyblue;
		padding: 10px;
		box-shadow: 0 0 10px black;
		border-radius: 10px;
	}
</style>
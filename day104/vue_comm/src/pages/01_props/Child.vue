<template>
  <div class="child">
    <h3>子组件</h3>
  </div>
</template>

<script>
	export default {
		name: 'Child',
	}
</script>

<style lang="less" scoped>
	.child{
		margin-top: 50px;
		background-color: skyblue;
		padding: 10px;
		box-shadow: 0 0 10px black;
		border-radius: 10px;
	}
</style>

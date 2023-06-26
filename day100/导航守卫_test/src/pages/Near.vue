<template>
	<div class="near">
		<h2>我是Near组件</h2>
		<img src="http://49.232.112.44/images/near.jpg" alt="">
	</div>
</template>

<script>
	export default {
		name:'Near',
	}
</script>

<style scoped>
	.near{
		background-color: yellowgreen;
		padding: 20px;
		border-radius: 10px;
		box-shadow: 0 0 10px;
	}
	img {
		width: 300px;
	}
</style>

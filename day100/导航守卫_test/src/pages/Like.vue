<template>
	<div class="like">
		<h2>我是Like组件</h2>
		<img src="http://49.232.112.44/images/girl.gif" alt="">
	</div>
</template>

<script>
	export default {
		name:'Like',
	}
</script>

<style scoped>
	.like{
		background-color: pink;
		padding: 20px;
		border-radius: 10px;
		box-shadow: 0 0 10px;
	}
	img {
		width: 300px;
	}
</style>

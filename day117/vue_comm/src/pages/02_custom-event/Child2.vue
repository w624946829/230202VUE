<template>
  <div class="box2">
	<h2>我是孩子组件2 ---- 父给我绑定了一个原生DOM自定义事件（click）</h2>
	<button>点我触发自定义click事件</button>
  </div>
</template>

<script>
	export default {
		name:'Child2'
	
	}
</script>

<style lang="less" scoped>
	.box2{
		margin-top: 50px;
		background-color: orange;
		padding: 10px;
		box-shadow: 0 0 10px black;
		border-radius: 10px;
	}
</style>
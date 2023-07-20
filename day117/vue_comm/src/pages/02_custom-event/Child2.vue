<template>
  <div class="box2">
    <h3>子组件2- -父组件给我绑定了一个原生DOM事件（click）</h3>
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
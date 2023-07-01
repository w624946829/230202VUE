<template>
  <div class="child">
    <h3>子组件 -- 父亲给我的sum是：{{sum}}</h3>
		<button @click="add(2)">点我让父亲的sum变多</button>
  </div>
</template>

<script>
	export default {
		name: 'Child',
		props: ['sum', 'add'],
		mounted(){
			console.log('Child',this)
		}
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

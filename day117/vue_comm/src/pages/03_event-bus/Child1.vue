<template>
  <div class="box1">
    <h3>子组件1 -- 我有一个玩具toy：{{ toy }}</h3>
	<button @click="$bus.$emit('send-toy',toy)" >点我把玩具给弟弟玩玩，别让他学习了</button>
  </div>
</template>

<script>
	export default {
		name:'Child1',
		data(){
			return {
				toy:'小汽车'
			}
		}
	}
</script>

<style lang="less" scoped>
	.box1{
		margin-top: 50px;
		background-color: skyblue;
		padding: 10px;
		box-shadow: 0 0 10px black;
		border-radius: 10px;
		button{
			margin-right: 10px;
		}
	}
</style>
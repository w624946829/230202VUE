<template>
  <div class="parent">
    <h3>父组件 -- 我自己的sum是：{{sum}}</h3>
	<button @click="sum += 1">点我让sum + 1 </button>
		<Child :sum ="sum" :add="add"/>
  </div>
</template>

<script>
	import Child from './Child.vue'
	
	export default {
		name: 'Index',
		components: {Child},
		data(){
			return {
				sum : 1

			}
		},
		methods:{
			add(value){
				this.sum += value 
			}
		}
	}
</script>

<style lang="less" scoped>
	.parent{
		background-color:rgb(165, 164, 164);
		padding: 20px;
		border-radius: 10px;
	}
</style>
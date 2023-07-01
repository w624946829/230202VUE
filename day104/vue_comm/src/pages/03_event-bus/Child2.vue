<template>
  <div class="box2">
    <h3> 子组件2 -- 从小就爱学习经常看book：{{ book }}，{{ toy }} </h3>
  </div>
</template>

<script>
	export default {
		name:'Child2',
		data(){
			return {
				book:'《JavaScript高级程序设计》',
				toy:''
			}
		},
		methods:{
			saveToy(t){
				this.toy = t
			}
		},
		mounted(){
			this.$bus.$on('send-toy',this.saveToy)
		},
		beforeDestroy(){
			this.$bus.$off('send-toy')
		}
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
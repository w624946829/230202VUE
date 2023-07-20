<template>
  <div class="parent">
    <h3>父组件</h3>
		<Child/>
  </div>
</template>

<script>
	import Child from './Child'

  export default {
    name: 'Index',
		components:{Child},
  }
</script>

<style lang="less" scoped>
	.parent{
		background-color: rgb(165, 164, 164);
		padding: 20px;
		border-radius: 10px;
	}
</style>

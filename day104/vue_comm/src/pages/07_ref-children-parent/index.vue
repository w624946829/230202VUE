<template>
  <div class="parent">
    <h3>父组件</h3>
    <Child1/>
    <Child2/>
  </div>
</template>

<script>
import Child1 from './Child1'
import Child2 from './Child2'

export default {
  name: 'Index',
	components: {Child1,Child2},
}
</script>

<style lang="less" scoped>
	.parent{
		background-color: rgb(165, 164, 164);
		padding: 20px;
		border-radius: 10px;
		button{
			margin-bottom: 10px;
			margin-left: 10px;
		}
	}
</style>


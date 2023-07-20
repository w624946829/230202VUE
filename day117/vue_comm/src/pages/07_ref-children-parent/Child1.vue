<template>
  <div class="child1">
    <h3>子组件1</h3>
  </div>
</template>

<script>

export default {
  name: 'Child1',
}
</script>

<style lang="less" scoped>
	.child1{
		background-color: orange;
		padding: 20px;
		border-radius: 10px;
    box-shadow: 0 0 10px black;
	}
</style>

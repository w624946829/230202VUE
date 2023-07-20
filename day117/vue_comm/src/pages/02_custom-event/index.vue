<template>
  <div class="box">
    <h3>父组件 -- 我是一个sum值是：{{ sum }}</h3>
  
    <Child1 @add-sum = "sum += $event"/>
    <Child2 @click.native="show3 "/>
  </div>
</template>

<script>
  import Child1 from './Child1'
  import Child2 from './Child2'

  export default {
    name: 'Index',
    
    components: {Child1,Child2},
    data(){
      return{
        sum:1
      }
    },
    methods:{
      show3(){
        alert('你点了我')
      }

    }
  }

</script>

<style lang="less" scoped>
	.box{
		background-color:rgb(165, 164, 164);
		padding: 20px;
    border-radius: 10px;
		button{
			margin-right: 5px;
		}
	}
</style>
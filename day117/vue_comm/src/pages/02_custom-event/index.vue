<template>
  <div class="box">
    <h2>我是父组件----sum为{{ sum }}</h2>
    <Child1 @add-sum="sum += $event "/>
    <Child2 @click.native="show3"/>
  </div>
</template>

<script>
import Child1 from './Child1.vue'
import Child2 from './Child2.vue'

  export default {
    name: 'Index',
    components:{Child1,Child2},
    data(){
      return {
        sum:1
      }
    },
   methods:{
    addSum(value){
       this.sum += value
     },
     show3(){
       alert('我是父组件的show3方法')
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
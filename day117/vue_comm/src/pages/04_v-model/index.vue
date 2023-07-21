<template>
  <div class="box">
    <h3>父组件</h3>
    <ul>
      <li>学校名称：{{name}}</li>
      <li>学校地址：{{address}}</li>
      <li>所学学科：{{ subject }}</li>
    </ul>
    【使用v-model】实现双向数据绑定：<input type="text" v-model="name" > <br>
    【不使用v-model】实现双向数据绑定：<input type="text" :value="address" @input="address = $event.target.value"/>
    <br>
    <AtguiguInput :value="subject" @input="subject = $event"/>
  

  </div>
</template>

<script>
  import AtguiguInput from './AtguiguInput.vue'



	export default {
		name: "Index",
    components:{AtguiguInput},
    data(){
      return {
        name:'清华大学',
        address:'北京市海淀区',
        subject:'计算机'
      }
    }
	};
</script>

<style lang="less" scoped>
.box {
  padding: 20px;
  background-color: rgb(165, 164, 164);
  border-radius: 10px;
}
</style>

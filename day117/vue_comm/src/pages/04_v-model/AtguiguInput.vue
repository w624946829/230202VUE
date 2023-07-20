<template>
    <div class="atguigu">
    <h4>子组件</h4>
    <input type="text" :value="value" @input="qwe">
 </div>
  
</template>

<script>
export default {
    name:"AtguiguInput",
    props:['value'],
    methods:{
        qwe(event){
            this.$emit('input',event.target.value)
        }
    }
}
</script>

<style lang="less" scoped>
 .atguigu {
    margin-top: 15px;
    background-color: skyblue;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px;
    input {
      height: 30px;
      width: 200px;
      background-image: linear-gradient(45deg,pink,yellow,pink);
    }
  }
</style>
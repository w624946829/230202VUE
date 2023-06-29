<template>
    <div>
      <ValidationProvider name ="女友" v-slot="{errors}" :rules = "`odd|required|eqeq:${number2},男友` ">
        女友：<input v-model="number"  type="text" placeholder=" 请输入女友的数量 ">
        <span>{{ errors[0] }}</span>
      </ValidationProvider>
      <br>
      <ValidationProvider name ="男友" v-slot="{errors}" rules = "odd|required">
        男友：<input v-model="number2"  type="text" placeholder=" 请输入男友的数量 ">
        <span>{{ errors[0] }}</span>
      </ValidationProvider>
    </div>
  
</template>

<script>
export default {
  name:"Test",
  data(){
    return{
      number:1,
      number2:1,
    }
  },
}
</script>

<style lang="less" scoped>
input {
    display: block;
  }
</style>
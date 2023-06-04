<template>
     <div class="box">
      <h3>这是mycomp</h3>
      <button @click="clickHandler">传参</button>
    </div>
  
</template>

<script>
export default {
    name:"mycomp",
    data(){
        return {
            msg:'我爱你'
        }
    },
    methods:{
        clickHandler(){
            this.$bus.$emit('xxx',this.msg)
        }
    }
}
</script>

<style scoped>
.box {
    border: 1px solid #333;
}
</style>
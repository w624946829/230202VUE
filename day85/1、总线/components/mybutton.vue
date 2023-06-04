<template>
    <div class="box">
        <h3>这是mybutton</h3>
        <div>recive: {{ recive }}</div>
    </div>
  
</template>

<script>
export default {
    name:"mybutton",
    data(){
        return {
            recive:''
        }
    },
    mounted(){
        this.$bus.$on('xxx',this.recivData)
    },
    methods:{
        recivData(arg){
            this.recive = arg
        }
    }
}
</script>

<style scoped>
.box {
    border: 1px solid #333;
}
</style>
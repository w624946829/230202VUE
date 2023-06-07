<template>
    <div class="box">
       <h4>mybutton</h4>
        <hr>
        <div>count:{{ $store.state.mybutton.count }}</div>
        <button @click ="addCount">自增</button>
        <br>
        <button @click ="$store.dispatch('decrementCount')">自减</button><br>
        <button @click ="oddAddCount">奇数自增</button><br>
        <button @click ="$store.dispatch('asyncIncrementCount')">异步自增</button>
    </div>
  
</template>

<script>
/*
在组件中使用count这个数据，和之前的count不是一个count
这个模块count也放在store，不能改名字
使用模块化
在4个核心配置项中配置modules，使用这个属性来配置模块化
*/
export default {
    name:"mybutton",
    mounted(){
        
    },
    methods:{
        addCount(){
            this.$store.dispatch('incrementCount')
        },
        oddAddCount(){
            this.$store.dispatch('oddIncrementCount')
        }
    }
}
</script>

<style scoped>
.box {
    border: 1px solid #333;
}
</style>
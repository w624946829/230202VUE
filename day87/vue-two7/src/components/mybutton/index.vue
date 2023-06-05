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
    <br>
    <br>
        <div>count:{{count}}</div>
        <div>flodCount:{{flodCount}}</div>
        <button @click="incrementCount">自增</button>
        <br>
        <button @click ="decrementCount">自减</button><br>
        <button @click ="oddIncrementCount">奇数自增</button><br>
        <button @click ="asyncIncrementCount">异步自增</button>
    </div>
  
</template>

<script>
/*
辅助函数
*/
import { mapState,mapActions,mapGetters } from "vuex"
export default {
    name:"mybutton",
    computed:{
        ...mapState({
            count:state=>state.mybutton.count
        }),
        ...mapGetters(['flodCount'])
    },
    mounted(){
        
    },
    methods:{
        addCount(){
            this.$store.dispatch('incrementCount')
        },
        oddAddCount(){
            this.$store.dispatch('oddIncrementCount')
        },
        ...mapActions(["incrementCount","decrementCount","oddIncrementCount","asyncIncrementCount"])

    }
}
</script>

<style scoped>
.box {
    border: 1px solid #333;
}
</style>
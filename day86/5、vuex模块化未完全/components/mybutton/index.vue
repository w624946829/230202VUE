<template>
    <div class="box">
      <h4>mybutton</h4>
        <hr>

        <div>count:{{ $store.state.mybutton.count }}</div>
        <button @click="addCount">自增</button><br>
        <button @click="$store.dispath('decrementCount')">自减</button><br>
        <button @click="addAddCount">奇数自增</button>
        <button @click="$store.dispath('asyncIncrementCount')">异步自增</button>

        <hr>
        <div>count:{{ count }}</div>
        <div>flodCount:{{flodCount}}</div>
        <button @click="incrementCount">自增</button>
        
    </div>
  
</template>

<script>
// 
import {mapState,mapActions,mapGetters} from 'vuex'
export default {
    name:"mybutton",
    compited:{
        ...mapState({
            count:state=>state.mybutton.count
        }),
        ...mapGetters(['flodCount'])
    },
    mounted(){
        console.log(this.$store);
    },
    methods:{
        addCount(){
            this.$store.dispatch('incrementCount')
        },
        odddAddCount(){
            this.$store.dispatch('oddIncrementCount')
        },
        ...mapActions(["incrementCount"])
    }

}
</script>

<style scoped>
.box {
    border: 1px solid #333;
}
</style>
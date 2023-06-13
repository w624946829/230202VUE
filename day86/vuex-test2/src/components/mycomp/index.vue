<template>
  <div class="box">
        <h4>mycomp组件</h4>
        <div>当前命名空间内</div>
        <div>count:{{$store.state.mycomp.count}}</div>
        <div>count*10:{{$store.getters['mycomp/tenflodCount']}}</div>
        <button @click="addHandler">自增</button>
        <hr />
       <div>辅助函数</div>
       <div>count:{{count}}</div>
       <div>count*10:{{tenflodCount}}</div>
       <button @click="increment">自增</button>
        <button @click="decrementCount">自减</button>
        <button @click="isEvenIncrementCount">偶数自增</button>
        <button @click="asyncIncrementCount">2s后自增</button>
    </div>
    
</template>

<script>
import {mapState,mapGetters,mapActions} from 'vuex';
  export default {
    name:'mycomp',
    computed:{
        ...mapState({
            count:state => state.mycomp.count 
        }),
        ...mapGetters('mycomp',['tenflodCount'])
    },
    methods:{
        addHandler(){
            this.$store.dispatch('mycomp/increment')
        },
        ...mapActions('mycomp',['increment']),
        ...mapActions('mycomp',['decrementCount']),
        ...mapActions('mycomp',['isEvenIncrementCount']),
        ...mapActions('mycomp',['asyncIncrementCount']),
    }

  }


</script>

<style scoped>
  .box {
    padding: 10px;
    border: 1px solid hotpink;
}
</style>
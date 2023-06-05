<template>
    <div>
      <h3>App</h3>
      <hr>
      <div>store中的count:{{$store.state.count}}</div>
      <div>store中的tenflodCount:{{$store.getters.tenflodCount}}</div>
      <button @click= "incrementHandler">count自增</button>
      <button @click="$store.dispatch('decrement')">count 自减</button>
      <button @click="isEvenIncrementHandler">count 偶数自增</button>
      <button @click="asyncIncrementHandler">count 异步自增</button>
        <hr>
        <div>message:{{$store.state.message}}</div>
        <button @click="changeMessage">修改message数据</button>


    </div>
  
</template>

<script>
export default {
    name:"App",
    methods:{
        incrementHandler(){
            this.$store.dispatch('increment')
        },
        isEvenIncrementHandler(){
            this.$store.dispatch('isEvenIncrement')
        },
        asyncIncrementHandler(){
            this.$store.dispatch('asyncIncrement')
        },
        //传参部分
        changeMessage(){
             this.$store.dispatch('changeMsg','燕子')
        }
    }
}
</script>

<style scoped>

</style>
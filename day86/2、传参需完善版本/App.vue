<template>
    <div>
      <h3>App</h3>
      <hr>
      <div>store中的count{{$store.state.count}}</div>
      <div>store中的tenflodCount:{{$store.getters.tenflodCount}}</div>
      <button @click ="incrementHanler">count自增</button>
      <button @click ="$store.dispatch('decrement')">count自减</button>
      <button @click ="isEvenIncrementHandler">count偶数自增</button>
      <button @click ="asyncIncrementHandler">count2s后自增</button>

    </div>
  
</template>

<script>
export default {
    name:"App",
    methods:{
        incrementHanler(){
            //调用store中的actions方法
            this.$store.dispatch('increment')
        },
        isEvenIncrementHandler(){
            this.$store.dispatch('isEvenIncrement')
        },
        asyncIncrementHandler(){
this.$store.dispatch('asyncIncrement')
        }

    }
}
</script>

<style scoped>

</style>
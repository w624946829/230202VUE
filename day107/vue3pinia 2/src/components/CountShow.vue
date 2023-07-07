<template>
    <h3>pinia使用的基本演示</h3>
    <h4>count:{{ countStore.count }},结果：{{ countStore.evenOrOdd }}</h4>
    <button @click="countStore.increment(1)">increment --- 加的操作</button>
    <button @click="countStore.decrement(1)">decrement --- 减的操作</button>
    <button @click="countStore.incrementIfOrOdd(1)">incrementIfOrOdd --- 奇数加的操作</button>
    <button @click="countStore.incrementAsync(1)">incrementAsync --- 异步加的操作</button>
    <hr>
    <h3>count:{{ count }},计算的结果：{{ getCountResult }},结果是：{{ evenOrOdd }}</h3>
    <h3>{{ newCount }}</h3>
</template>
<script lang="ts">
import { mapState } from 'pinia';
export default {
    name: 'CountShow',
    computed:{
        ...mapState(useCountStore,['newCount'])
    }
}
</script>
<script lang="ts" setup>
import {useCountStore} from '../store/counter'
import {storeToRefs} from 'pinia'
const countStore = useCountStore()
const {count,evenOrOdd,getCountResult} = storeToRefs(countStore)
</script>
<style scoped>
</style>
<template>
   <h3>pinia的基本使用</h3>
    <h4>count:{{ countStore.count }},结果：{{ countStore.evenOrOdd }}</h4>
    <button @click="countStore.increment(1)">incremrnt --- 加的操作</button>
    <button @click="countStore.decrement(1)">decrement --- 减的操作</button>
    <button @click="countStore.incrementIfOdd(1)">incrementIfOdd --- 奇数加的操作</button>
    <button @click="countStore.incrementAsync(1)">incremrnt --- 异步加的操作</button>

    <br>

    <h3>count:{{ count }},计算的结果是：{{ getCountResult }},结果为：{{ evenOrOdd }}</h3>

</template>
<script lang="ts">
    export default {
        neme: 'CountShow',
     
    }
</script>

<script setup lang="ts">
// 引入仓库模块
import { mapState } from 'pinia';
import { useCounterStore } from '../store/counter'

import {storeToRefs} from 'pinia'
// 获取数据改变的仓库countStore
const  countStore = useCounterStore()
// 结构pinia中某一个仓库中的数据（状态数据和计算属性）
const {count,evenOrOdd,getCountResult} = storeToRefs(countStore)


</script>

<style scoped>

</style>
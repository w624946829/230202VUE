<template>
    <h3>展示品牌信息数据</h3>
    <ul v-for = "(tm,index) in trademarkStore.trademarkList" :key="tm.id">
        <span>{{ tm.tmName }}</span>
        <img :src="tm.logoUrl" :alt="tm.tmName" width="100" height="100">
    </ul>
</template>
<script lang="ts">
export default {
    name: 'Trademark'
}
</script>
<script lang="ts" setup>
    import { onMounted } from 'vue';
    import { useTrademarkStore } from '../store/trademark';
    const trademarkStore = useTrademarkStore()
    onMounted(()=>{
        trademarkStore.getTrademarkList(1,10)
    })

</script>
<style scoped>
</style>
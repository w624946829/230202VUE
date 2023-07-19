<template>
  <div class="home">
    <!-- 线形图 -->
    <LineView/>
    <!-- 柱状图 -->
    <BarView/>
    <!-- 饼状图 -->
    <PieView/>
    <!-- 地图 -->
    <MapView/>
</div>
</template>

<script lang="ts">
export default {
  name: 'Home',
}
</script>
<script lang="ts" setup>
// 引入线形图组件
import LineView from './components/LineView.vue'
// 引入柱状图组件
import BarView from './components/BarView.vue'
// 引入饼图组件
import PieView from './components/PieView.vue'
// 引入地图组件
import MapView from './components/MapView.vue'


import { useDataStore } from '@/stores/reportData';
import { onMounted } from 'vue';
// -----------------------------------------------
const dataStore = useDataStore()

// 组件挂在后分发pinia中的action，获取数据可视化的相关数据
onMounted(() => dataStore.getData())

</script>

<style scoped>
  .home {
    width: 100%;
    height: 100%;
    padding: 20px;
    font-size: 30px;
  }
</style>

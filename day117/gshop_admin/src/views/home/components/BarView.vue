<template>
    <el-card shadow="always" class="bar-view">
    <el-menu :default-active="state.activeIndex" class="el-menu-demo" mode="horizontal" @select="(val:any)=>state.activeIndex=val">
      <el-menu-item index="1">销售额</el-menu-item>
      <el-menu-item index="2">访问量</el-menu-item>
    </el-menu>
    <v-chart class="content" :option="getOption()" autoresize></v-chart>
  </el-card>
</template>
<script lang="ts">
export default {
    name: 'BarView'
}
</script>
<script lang="ts" setup>
import { reactive, computed } from 'vue'
// 引入数据仓库
import {useDataStore} from '@/stores/reportData'
const dataStore = useDataStore()
const orderFullYearAxis = computed(()=>dataStore.reportData.orderFullYearAxis||[]) // 销售额对应的横轴数据
const orderFullYear = computed(()=>dataStore.reportData.orderFullYear||[]) // 销售额数组数据
const userFullYearAxis = computed(()=>dataStore.reportData.userFullYearAxis||[]) // 访问量对应的横轴数据
const userFullYear = computed(()=>dataStore.reportData.userFullYear||[]) // 访问量数组数据


//select选中的值
const handleSelect = (val:any) => state.activeIndex = val

// 定义状态数据，用来存储选中的菜单的索引值
const state = reactive({
    activeIndex: '1'
})
// 
const getOption = () => {
    // 配置项
    return {
        // 标题
        title: {
            text: '测试数据'
        },
        // 横轴
        xAxis: {},
        // 纵轴
        yAxis: {},//不显示纵轴
        // 系列组件
        series: [],
        // 提示框
        tooltip: {},
        // 四周的位置
        grid: {},
    }
}
</script>
<style lang="scss" scoped>
.bar-view {
    margin-top: 20px;

    .content {
        height: 270px;
    }
}</style>
<template>
    <el-card shadow="always" class="bar-view">
        <el-menu :default-active = "state.activeIndex" class="el-menu-demo" mode="horizontal" @select="(val:any)=>state.activeIndex=val">
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
import {reactive,computed} from 'vue'
// 引入仓库数据
import { useDataStore } from '@/stores/reportData';
import useFormat from '@/hooks/useFormat';
const dataStore = useDataStore()
const orderFullYearAxis = computed(()=>dataStore.reportData.orderFullYearAxis || [])
const orderFullYear = computed(()=>dataStore.reportData.orderFullYear || [])
const userFullYearAxis = computed(()=>dataStore.reportData.userFullYearAxis || [])
const userFullYear = computed(()=>dataStore.reportData.userFullYear || [])
// 定义状态数据，用来存储选中的菜单
const state = reactive({
    activeIndex:'1'
})
const getOption=()=>{
    // 配置项
    return{
        // 标题
        title:{text:'测试数据'},
        // 横轴
        xAxis:{},
        // 纵轴
        yAxis:{},
        // 系列组件
        series:[],
        // 提示框
        tooltip:{},
        // 四周的位置
        grid:{},
    }
}
</script>
<style lang="scss" scoped>
    .bar-view{
        margin-top: 20px;
        .content{
            height:270px;
        }
    }
</style>
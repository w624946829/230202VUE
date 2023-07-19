<template>
    <el-card shadow="always" class="line-view">
        <div class="title">今日订单</div>
        <div class="value">{{ numberFormat(orderToday) }}</div>
        <div ref="chartRef" style="width:100%;height:100%"></div>
    </el-card>
</template>
<script lang="ts">
export default {
    name: 'LineView'
}
</script>
<script lang="ts" setup>
// 引入echarts
import {$echarts} from '@/plugins/echarts';
import { EChartsType } from 'echarts'
// 引入数据仓库
import { useDataStore } from '@/stores/reportData';

import { ref,onMounted,computed,watch } from 'vue';
import useFormat from '@/hooks/useFormat';
// -----------------------------------------------
const {numberFormat} = useFormat()
const dataStore = useDataStore()
// 获取今日订单数据
const orderToday = computed(() => dataStore.reportData.orderToday)
// 实时交易数据
const orderTrend = computed(() => dataStore.reportData.orderTrend || [])
// 横轴数据
const orderTrendAxis = computed(()=> dataStore.reportData.orderTrendAxis || [])
// 定义变量用来获取div对象
const chartRef = ref()
// 定义函数,返回配置对象
let chart: EChartsType
// 定义函数，返回配置对象
const getOption =()=>{
    return {
        // 横轴
        xAxis:{
            show:true,//显示横轴的数据
            data:orderTrendAxis.value,//横轴的数据
            boundaryGap:false,//两边不留白
        },
        // 纵轴
        yAxis:{ show:false },//不显示纵轴
        // 系列组件
        series:[
            {
                name:'实时交易量',//名字
                type:'line',//图形类型
                data:orderTrend.value,// 数据
                itemStyle:{opacity:0,},//折线拐点的样式
                lineStyle:{opacity:0,color:'#02a774'},//折线的样式
                areaStyle:{color:'#5fbbff'},//区域的填充颜色
                smooth:true,//是否是平滑显示
            }
        ],
        // 提示框
        tooltip:{trigger:'axis'},
        // 四周的位置
        grid:{
            grid:{left:0,right:0,bottom:0,top:0},
        },
    }
}
// 组件挂载
onMounted(()=>{
    // 根据div来进行echart的初始化
    chart= $echarts.init(chartRef.value)
    chart.setOption(getOption())
    // 绑定一个窗口发生变化的事件
    window.addEventListener('resize',()=>{
        chart&&chart.resize()
    })
})
// 监视数据
watch(orderTrend,()=>{
    chart.setOption(getOption())
})
// 设置配置项
</script>
<style lang="scss" scoped>
.line-view {
  .title{
    font-size:13px;
    color:#999;
  }
  .value{
    font-size:24px;
    margin:5px 0;
    letter-spacing: 1px;
  }
}
</style>
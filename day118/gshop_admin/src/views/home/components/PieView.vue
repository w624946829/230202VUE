<template>
      <el-card shadow="always" class="pie-view">
    <template #header>
      <el-radio-group v-model="selectRadio">
        <el-radio-button label="品类" />
        <el-radio-button label="商品" />
      </el-radio-group>
    </template>
    <v-chart autoresize :option="getOption()"></v-chart>
  </el-card>
</template>
<script lang="ts">
export default {
    name: 'PieView'
}
</script>
<script lang="ts" setup>

import { ref, reactive, computed } from 'vue'
import { useDataStore } from '@/stores/reportData'

// 通过ts中的interface定义某个对象的类型
interface CategoryOrGoodsModel {
    name: string,//名字带占比
    percent: string,//占比
    value: number,//数量值
    labelName: string,//名字
}
const selectRadio = ref('品类')
const dataStore = useDataStore()
// 从数据仓库中取出要计算的数据
const saleRank = computed(() => dataStore.reportData.saleRank)
// 计算饼图需要的数据
const pieData = computed(() => {
    const data = {
        categoryList: [] as CategoryOrGoodsModel[],//品类的数组
        categoryTotal: 0,//品类的总数
        goodsList: [] as CategoryOrGoodsModel[],//商品的数组
        goodsTotal: 0,//商品的总数
    }
    // 判断对象数据是否存在
    if (saleRank.value) {
    // 解构出对象中所需要计算的所有的数据
    const {
      category: { axisX: axisX1, data1 },
      goods: { axisX: axisX2, data1: data2 }
    } = saleRank.value
    // 计算品类数据的总数据
    const total1 = data1.reduce((pre, item) => pre + item, 0)
    // 把品类的总数据存储起来
    data.categoryTotal = total1
    // 计算一个数组,数组中有对象,对象中有4个属性
    axisX1.forEach((item, index) => {
      // 先计算比例
      const percent = ((data1[index] / total1) * 100).toFixed(2) // 计算占比,保留2位小数
      // 向数组中添加对象
      data.categoryList.push({
        name: item + '|' + percent + '%', // 名字带有百分比的 ---粉面粥店|23%
        percent, // 占比
        value: data1[index], // 数据
        labelName: item // 名字---粉面粥店
      })
    })
    // 计算商品的总数
    const total2 = data2.reduce((pre, item) => pre + item, 0)
    // 把商品的总数据存储起来
    data.goodsTotal = total2
    // 计算一个数组,数组中有对象,对象中有4个属性
    axisX2.forEach((item, index) => {
      // 先计算比例
      const percent = ((data2[index] / total2) * 100).toFixed(2) // 计算占比,保留2位小数
      // 向数组中添加对象
      data.goodsList.push({
        name: item + '|' + percent + '%', // 名字带有百分比的 ---
        percent, // 占比
        value: data2[index], // 数据
        labelName: item // 名字---
      })
    })
  }
    return data
})
const getOption = () => {
    // 获取计算后的饼图数据
    const { categoryList, categoryTotal, goodsList, goodsTotal } = pieData.value
    // 计算出饼图所需要的data数据
    const data = selectRadio.value === '品类' ? categoryList : goodsList
    // 计算出饼图的副标题总数数据
    const total = selectRadio.value === '品类' ? categoryTotal :goodsTotal

    return {
        //标题
        title: [
            // 主标题
        {
            text: `${selectRadio.value}分布`,//标题的内容
            textStyle: {
                fontSize: 14,
                color: '#666'
            },//标题的文字颜色和字体大小
            left: 20,
            top: 20,
        },
        //副标题 
        {
            text: '累计订单量',//标题的内容
            textStyle: {
                fontSize: 14,
                color: '#999'
            },//标题的文字颜色和字体大小
            subtext: total,//副标题的内容
            subtextStyle:{fontSize:28,color:'#333'},
            left: '35%',
            top: '45%',
             textAlign:'center'
        },
        ],
        // 图例
        legend: {
            top: 'middle',
            left: '65%',
            categoryList:'vertical'
        },
        series: [
            {
                name: `${selectRadio.value}分布`,
                type: 'pie',
                radius: ['35%', '65%'],//半径设置
                center:['35%','50%'],//圆心的位置
                avoidLabelOverlap: false,//不开启重叠
                itemStyle: {
                    borderRadius: 2,//倒角
                    borderColor: '#fff',//边框的颜色
                    borderWidth: 2// 边框的宽度
                },
                label: {
                    show: true,//标签的文本是否显示
                    position: 'outside',//标签中的文本显示的位置
                    formatter(params:any){
                        // 设置标签中的文本的内容-- 各时期
                        return params.data.labelName
                    }//标签中的文本的内容
                },
                labelLine: {
                    show: true,//是否显示
                    length:5,//第一条线的长度
                    length2:15//第二条线的长度
                },
                data, //数据
            }
        ],
        // 提示框
        tooltip: {
            trigger: 'item',
            // 格式化的数据
            formatter(params:any){
                return ` ${selectRadio.value}分布<br/>
                ${params.marker}${params.data.labelName}<br/>
                ${params.marker}数量：${params.data.value}<br/>
                ${params.marker}占比：${params.percent +'%'}<br/>
                `
            }

        },
    }
}


</script>
<style lang="scss" scoped>
.pie-view {
    margin-top: 20px;
    height: 450px;

    :deep(.el-card__body) {
        height: 450px;
    }
}
</style>
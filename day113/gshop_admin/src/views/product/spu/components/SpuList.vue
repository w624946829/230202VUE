<template>
    <div>
        <!-- 一个按钮 -->
        <el-button type="primary" :icon="Plus">添加SPU</el-button>
        <!-- 表格 -->
        <el-table v-loading="loading" :data="spuInfoList" stripe border style="width: 100%">
            <el-table-column type="index" label="序号" width="80" align="center" />
            <el-table-column prop="" label="SPU名称" />
            <el-table-column prop="" label="SPU描述" />
            <el-table-column label="操作">
                <template #default="{ row, $index }">
                    <el-button type="primary" size="small"  :icon="Plus"></el-button>
                    <el-button type="primary"  size="small" :icon="Edit"></el-button>
                    <el-button type="info"  size="small" :icon="InfoFilled" ></el-button>
                    <el-button type="danger"  size="small" :icon="Delete"></el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 分页组件 -->

      <el-pagination style="margin-top: 20px" v-model="currentPage" v-model:page-size="pageSize" :page-sizes="[3, 6, 9]"
        background layout=" prev, pager, next, jumper,->,total,sizes, " :total="total"
        @size-change="getSpuInfoList(1, $event)" @current-change="getSpuInfoList($event, pageSize)" />

    </div>
</template>
<script lang="ts">
export default {
    name: 'SpuList'
}
</script>
<script lang="ts" setup>
//   引入element-plus的组件
import { Plus, Edit, Delete, Loading,InfoFilled } from "@element-plus/icons-vue";
import {ref}  from 'vue'
// 银土spu相关的数据类型
import type { SpuListModel } from "@/api/product/model/spuModel";
// 加载的标识效果
const loading = ref<boolean>(false)
// 定义一个数组，用来存储spu对象的数组列表数据
const spuInfoList = ref<SpuListModel>([])
// 页码
const currentPage = ref<number>(1)
// 每页的条数
const pageSize = ref<number>(3)
// 总条数
const total = ref<number>(0)
const getSpuInfoList = (
    page:number= currentPage.value,
    limit:number= pageSize.value
)=>{
    // 更新页码数和每页的条数
    currentPage.value = page
    pageSize.value = limit
    // 修改加载的效果
    loading.value = true
    // 修改接口
    // 修改加载的效果
    loading.value =false
}
</script>
<style scoped></style>
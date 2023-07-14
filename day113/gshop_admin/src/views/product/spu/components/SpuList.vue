<template>
    <div>
        <!-- 一个按钮 -->
        <el-button type="primary" :icon="Plus" >添加SPU</el-button>
        <!-- 表格 -->
        <el-table v-loading="loading" :data="spuInfoList" stripe border style="width: 100%">
            <el-table-column type="index" label="序号" width="80" align="center" />
            <el-table-column prop="spuName" label="SPU名称" />
            <el-table-column prop="description" label="SPU描述" />
            <el-table-column label="操作">
                <template #default="{ row, $index }">
                    <el-button type="primary" size="small" :icon="Plus" title="添加SKU"></el-button>
                    <el-button type="primary" size="small" :icon="Edit" title="修改SPU" @click="updateShowSpu(row)"></el-button>
                    <el-button type="info" size="small" :icon="InfoFilled" title="查看SKU"></el-button>
                    <el-button type="danger" size="small" :icon="Delete" title="删除SPU"></el-button>
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
import { Plus, Edit, Delete, Loading, InfoFilled } from "@element-plus/icons-vue";
import { ref,watch } from 'vue'
// 引入spu相关的数据类型
import type { SpuListModel,SpuModel } from "@/api/product/model/spuModel";
// 引入spu相关的接口函数
import { getSpuInfoListApi } from "@/api/product/spu";
// 引入三级的分类的仓库
import { useCategoryStore } from '@/stores/category' ;
import { ShowStatus } from "../types";
// 获取仓库的对象
const categoryStore = useCategoryStore();
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
const getSpuInfoList = async (
    page: number = currentPage.value,
    limit: number = pageSize.value
) => {
    // 更新页码数和每页的条数
    currentPage.value = page
    pageSize.value = limit
    // 修改加载的效果
    loading.value = true
    // 调用接口
    const result = await getSpuInfoListApi({page,limit,category3Id:categoryStore.category3Id as number})
    // 更新数据
    spuInfoList.value = result.records //spu 数组
    total.value = result.total //总数
    // 修改加载的效果
    loading.value = false
}
// 监视三级分类的id数据，然后获取spu对象的列表数据
watch(()=>categoryStore.category3Id,(category3Id)=>{
    // 判断三级分类id数据是否有意义
    if(!category3Id){
        currentPage.value = 1
        pageSize.value = 3
        total.value = 0
        spuInfoList.value = [] //清除spu对象数组数据
        return 
    }
    getSpuInfoList()
})
// 接收父级组件传递过来的自定义事件
const emits = defineEmits(['setCurrentShowStatus'])


// 修改spu按钮的点击事件对应的回调函数
const updateShowSpu = (row:SpuModel)=>{
    //分发自定义事件
    emits('setCurrentShowStatus',ShowStatus.SPU_FORM)
}
</script>
<style scoped></style>
<template>
    <div>
        <el-card>
            <!-- 表格 -->
            <el-table v-loading="loading" :data="spuInfoList" string border style="width: 100%">
                <el-table-column type="index" label="序号" width="80" align="center" />
                <el-table-column prop="skuName" label="名称" />
                <el-table-column prop="skuDesc" label="描述" />
                <el-table-column label="默认图片" align="center">
                    <template #default="{ row, index }">
                        <el-image :src="row.skuDefaultImg" style="width: 80px; height: 80px;"></el-image>
                    </template>
                </el-table-column>

                <el-table-column prop="weight" label="重量（千克）" />
                <el-table-column prop="price" label="价格" width="80" />
                <el-table-column label="操作" width="250px" align="center">
                    <template #default="{ row, $index }">
                        <el-button type="info" :icon="Top" size="small" title="上架" v-if="row.isSale === 0"
                            @click="onSaleOrcancelSale(row, 1)"></el-button>
                        <el-button type="success" :icon="Bottom" size="small" title="下架" v-else
                            @click="onSaleOrcancelSale(row, 0)"></el-button>
                        <el-button type="primary" :icon="EditPen" size="small" title="修改"></el-button>
                        <el-button type="info" :icon="InfoFilled" size="small" title="查看"
                            @click="showSkuInfo(row)"></el-button>
                        <el-button type="danger" :icon="Delete" size="small" title="删除"
                            @click="deleteSpuInfo(row)"></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页组件 -->
            <el-pagination style="margin-top:20px" v-model:current-page="currentPage" v-model:page-size="pageSize"
                :page-sizes="[10, 20, 30]" background layout=" prev, pager, next, jumper,->,total, sizes," :total="total"
                @size-change="getSpuInfoList(1, $event)" @current-change="getSpuInfoList($event, pageSize)" />
        </el-card>
        <!-- 抽屉组件 -->
        <el-drawer v-model="isShowSkuInfo" :direction="direction" :with-header="false" size="50%">
            <!-- 结构搭建 -->
            <!-- 名称 -->
            <el-row>
                <el-col :span="5">名称：</el-col>
                <el-col :span="16">{{ skuInfo?.skuName }}</el-col>
            </el-row>
            <!-- 描述 -->
            <el-row>
                <el-col :span="5">描述：</el-col>
                <el-col :span="16">{{ skuInfo?.skuDesc }}</el-col>
            </el-row>
            <!-- 价格 -->
            <el-row>
                <el-col :span="5">价格：</el-col>
                <el-col :span="16">{{ skuInfo?.price }}</el-col>
            </el-row>
            <!-- 平台属性 -->
            <el-row>
                <el-col :span="5">平台属性：</el-col>
                <el-col :span="16">
                    <div v-if="skuInfo?.skuAttrValueList.length">
                        <el-tag type="sucess" v-for="(attr, index) in skuInfo?.skuAttrValueList" :key="attr.id"
                            style="margin-right: 5px;margin-bottom: 5px;">{{ attr.attrName }}--{{ attr.valueName }}</el-tag>
                    </div>
                    <div v-else></div>
                </el-col>
            </el-row>
            <!-- 销售属性 -->
            <el-row>
                <el-col :span="5">销售属性：</el-col>
                <el-col :span="16">
                    <div v-if="skuInfo?.skuSaleAttrValueList.length">
                        <el-tag type="sucess" v-for="(attr, index) in skuInfo?.skuSaleAttrValueList" :key="attr.id"
                            style="margin-right: 5px;margin-bottom: 5px;">{{ attr.saleAttrName }}--{{ attr.saleAttrValueName }}</el-tag>
                    </div>
                    <div v-else></div>
                </el-col>
            </el-row>
            <!-- 商品图片 -->
            <el-row>
                <el-col :span="5">商品图片：</el-col>
                <el-col :span="16">
                    <el-carousel v-if="skuInfo?.skuImageList.length" trigger="click" height="400px" style="height: 400px;">
                        <el-carousel-item v-for="(item,index) in skuInfo?.skuImageList" :key="item.id">
                            <el-image :src="item.imgUrl" style="width: 100%; height: 100%;"></el-image>
                        </el-carousel-item>
                    </el-carousel>
                </el-col>
            </el-row>
        </el-drawer>
    </div>
</template>
<script lang="ts">
export default {
    name: 'Sku'
}
</script>
<script lang="ts" setup>
import { Plus, Edit, Delete, Loading, Top, Bottom, EditPen, InfoFilled } from '@element-plus/icons-vue'
// 引入ref
import { onMounted, ref, watch } from 'vue'
// 引入spu相关的数据类型
import type { SpuListModel, SpuModel } from '@/api/product/model/spuModel'
// 引入spu相关的接口函数
import { deleteSpuInfoBySpuIdApi, getSpuInfoListApi } from '@/api/product/spu'
// 引入三级分类的仓库
import { useCategoryStore } from '@/stores/category'

// 引入 根据spu的id获取sku对象的数组列表数据
import { cancelSaleApi, getSkuInfoBySkuIdApi, getSkuInfoListApi, deleteSkuInfoByIdApi, onSaleApi } from '@/api/product/sku'
// 引入sku相关的数据类型
import { SkuListModel, type SkuModel } from '@/api/product/model/skuModel'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getSkuInfoListBySpuIdApi } from '@/api/product/sku'

// ---------------------------------------------------------------------------------------------------------
// 加载圈
const loading = ref<boolean>(false)
// 
const spuInfoList = ref<SkuListModel>([])

const currentPage = ref<number>(1)
const pageSize = ref<number>(10)
const total = ref<number>(0)
const getSpuInfoList = async (page: number = currentPage.value, limit: number = pageSize.value) => {
    // 更新页码和每页的条数以及加载的标识
    currentPage.value = page
    pageSize.value = limit
    loading.value = true
    // 调用接口函数
    const result = await getSkuInfoListApi(page, limit)
    // 更新数据
    spuInfoList.value = result.records // spu数组
    total.value = result.total // 总数
    // 修改加载的效果
    loading.value = false
}
onMounted(() => {
    getSpuInfoList()
})
// 上架或者下架
const onSaleOrcancelSale = async (row: SkuModel, flagNum: number) => {
    flagNum === 1 ? await onSaleApi(row.id as number) : await cancelSaleApi(row.id as number)
    ElMessage.success(flagNum === 1 ? '上架成功' : '下架成功')
    row.isSale = flagNum
    getSpuInfoList()
}
// 控制抽屉组件显示或者隐藏
const isShowSkuInfo = ref(false)
// 抽屉组件的方向
const direction = ref('rtl')
//定义一个对象，用来存储sku对象的详情信息数据
const skuInfo = ref<SkuModel>()
// 查看详情按钮的点击事件对应的回调函数
const showSkuInfo = async (row: SkuModel) => {
    // 弹窗提示
    ElMessage.success('查看成功')
    // 调用接口函数
    isShowSkuInfo.value = true
    // 根据sku对象的id获取sku对象的详情信息数据
    skuInfo.value = await getSkuInfoBySkuIdApi(row.id as number)
    // 更新数据
    getSpuInfoList()
}
// 删除按钮的点击事件对应的回调函数
const deleteSpuInfo = async (row: SpuModel) => {
    // 弹窗提示
    const confirmResult = await ElMessageBox.confirm('确定要删除吗？', '提示');
    if (confirmResult !== 'confirm') {
        return;
    }

    // 检查spu中对应的sku列表数据
    const skuList = await getSkuInfoListBySpuIdApi(row.id as number);
    if (skuList.length > 0) {
        const confirmResult = await ElMessageBox.confirm('当前SPU存在SKU数据，是否先删除SKU数据？', '提示');
        if (confirmResult === 'confirm') {
            // 清理所有的sku列表数据后（当前spu对应的sku列表）
            await Promise.all(skuList.map(async (sku: any) => {
                await deleteSkuInfoByIdApi(sku.id as number);
            }));
        } else {
            return;
        }
    }

    // 再删除spu数据
    await deleteSkuInfoByIdApi(row.id as number);
    ElMessage.success('删除成功');
    getSpuInfoList();
};
</script>
<style scoped></style>
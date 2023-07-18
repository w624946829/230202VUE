<template>
  <div>
    <!-- 按钮 -->
    <el-button type="primary" :icon="Plus" @click="addShowSpu">添加SPU</el-button>
    <!-- 表格 -->
    <el-table v-loading="loading" :data="spuInfoList" string border style="width: 100%">
      <el-table-column type="index" label="序号" width="80" align="center" />
      <el-table-column prop="spuName" label="SPU名称" />
      <el-table-column prop="description" label="SPU描述" />
      <el-table-column label="操作">
        <template #default="{ row, $index }">
          <el-button type="primary" :icon="Plus" size="small" title="添加SKU" @click="showAddSku(row)" ></el-button>
          <el-button type="primary" :icon="Edit" size="small" title="修改SPU" @click="updateShowSpu(row)"></el-button>
          <el-button type="info" :icon="InfoFilled" size="small" title="查看SKU" @click="showSkuInfoList(row)"></el-button>
          <el-button type="danger" :icon="Delete" size="small" title="删除SPU"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <el-pagination style="margin-top:20px" v-model:current-page="currentPage" v-model:page-size="pageSize"
      :page-sizes="[3, 6, 9]" background layout=" prev, pager, next, jumper,->,total, sizes," :total="total"
      @size-change="getSpuInfoList(1, $event)" @current-change="getSpuInfoList($event, pageSize)" />
    <!-- 对话框 -->
    <el-dialog v-model="dialogTableVisible" :title="`${spuInfo?.spuName} => SKU列表`">
      <el-table :data="skuInfoList">
        <el-table-column property="skuName" label="名称" width="150" />
        <el-table-column property="price" label="价格（元）" />
        <el-table-column property="weight" label="重量（千克）" />
        <el-table-column label="默认图片">
          <template #default="{ row, $index }">
            <el-image :src="row.skuDefaultImg" style="width: 100px; height: 100px;"></el-image>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>
<script lang="ts">
export default {
  name: 'SpuList'
}
</script>
<script lang="ts" setup>
// 引入图标组件(按钮中所需要的icon属性的表达式)
import {
  Plus,
  Edit,
  Delete,
  Loading,
  InfoFilled
} from '@element-plus/icons-vue'
// 引入ref
import { ref, watch } from 'vue'
// 引入spu相关的数据类型
import type { SpuListModel, SpuModel } from '@/api/product/model/spuModel'
// 引入spu相关的接口函数
import { getSpuInfoListApi } from '@/api/product/spu'
// 引入三级分类的仓库
import { useCategoryStore } from '@/stores/category'
import { ShowStatus } from '../types'
// 引入 根据spu的id获取sku对象的数组列表数据
import { getSkuInfoListBySpuIdApi } from '@/api/product/sku'
import { SkuListModel, type SkuModel } from '@/api/product/model/skuModel'
// 获取三级分类的仓库对象
const categoryStore = useCategoryStore()
// 加载的标识效果
const loading = ref<boolean>(false)
// 定义一个数组,用来存储spu对象的数组列表数据
const spuInfoList = ref<SpuListModel>([])
// 页码
const currentPage = ref<number>(1)
// 每页的条数
const pageSize = ref<number>(3)
// 总条数
const total = ref<number>(0)
// 获取spu对象的列表数据
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
  const result = await getSpuInfoListApi({
    page,
    limit,
    category3Id: categoryStore.category3Id as number
  })
  // 更新数据
  spuInfoList.value = result.records // spu数组
  total.value = result.total // 总数
  // 修改加载的效果
  loading.value = false
}
// 监视三级分类的id数据,然后获取spu对象的列表数据
watch(
  () => categoryStore.category3Id,
  (category3Id) => {
    // 判断三级分类id数据是否有意义
    if (!category3Id) {
      currentPage.value = 1
      pageSize.value = 3
      total.value = 0
      spuInfoList.value = [] // 清掉spu对象数组数据
      return
    }
    getSpuInfoList()
  }, { immediate: true }
)

// 接收父级组件传递过来的自定义事件
const emits = defineEmits(['setCurrentShowStatus', 'setCurrentSpuInfo'])

// 修改spu按钮的点击事件对应的回调函数
const updateShowSpu = (row: SpuModel) => {
  // 分发自定义事件
  emits('setCurrentShowStatus', ShowStatus.SPU_FORM)
  emits('setCurrentSpuInfo', {
    ...row,
    spuImageList: [],
    spuSaleAttrList: []
  })
}

// 添加spu按钮的点击事件对应的回调函数
const addShowSpu = () => {
  emits('setCurrentShowStatus', ShowStatus.SPU_FORM)
  emits('setCurrentSpuInfo')
}
// spu对象
const spuInfo = ref<SpuModel>()
// 用来存储sku对象数组列表数据的
const skuInfoList = ref<SkuListModel>([])
// 点击查看sku按钮的事件的回调函数
const showSkuInfoList = async (row: SpuModel) => {
  dialogTableVisible.value = true
  // spu对象数据存储了
  spuInfo.value = row
  // 调用接口，发送请求
  skuInfoList.value = await getSkuInfoListBySpuIdApi(row.id as number)
  console.log(skuInfoList.value);

}

// 定义一个标识用来控制对话框显示或隐藏
const dialogTableVisible = ref<boolean>(false)

// 点击添加sku按钮的点击事件对应的回调函数
const showAddSku =(row:SpuModel)=>{
    // 组件界面的切换
    emits('setCurrentShowStatus',ShowStatus.SKU_FORM)
    // 分发自定义事件，传递spu对象数据
    emits('setCurrentSpuInfo',{
        id:row.id,//spu的id
        spuName:row.spuName,//spu的名字
        
    })
} 
</script>
<style scoped></style>
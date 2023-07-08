<template>
  <!-- 使用卡片组件进行包裹 -->
  <el-card>
    <!-- 按钮 -->
    <template #header>
      <el-button type="primary" :icon="Plus">添加</el-button>
    </template>
    <!-- 表格 -->
    <el-table :data="trademarkList" border style="width: 100%">
      <el-table-column
        type="index"
        label="序号"
        width="100"
        align="center"
        stripe
      />
      <el-table-column prop="tmName" label="品牌名称" />
      <el-table-column label="品牌LOGO">
        <template #default="{ row, $index }">
          <img :src="row.logoUrl" :alt="row.tmName" width="100" height="60" />
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button size="small" type="warning" :icon="Edit">修改</el-button>
          <el-button size="small" type="danger" :icon="Delete">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>
  <script lang="ts" setup>
//   引入element-plus的组件
import { Plus, Edit, Delete } from "@element-plus/icons-vue";
// import {warning,danger} from '@element-plus/icons-vue'
// 引入ref
import { ref, onMounted } from "vue";
//引入品牌相关的数据类型
import type {
  TrademarkModel,
  TrademarkListModel,
  TrademarkPageModel,
} from "@/api/product/model/trademarkModel";
// 引入添加品牌，修改品牌，删除品牌，，根据页码和条数获取品牌列表的接口
import {
  addOrUpdateTrademarkApi,
  deleteTrademarkByIdApi,
  getTrademarkListApi,
} from "@/api/product/trademark";

const currentPage = ref<number>(1);
const pageSize = ref<number>(10);
const total = ref<number>(0);
// 定义一个数组，用来存储品牌对象列表数据
const trademarkList = ref<TrademarkListModel>([]);

// 封装一个函数用来调用接口发送请求，获取品牌列表的数据
const getTrademarkList = async (
  page: number = currentPage.value,
  limit: number = pageSize.value
) => {
  // 更新页码和每页条数的数据
  currentPage.value = page;
  pageSize.value = limit;
  // 调用接口，获取品牌列表的数据
  const result = await getTrademarkListApi(page, limit);
  // 将获取到的数据赋值给品牌列表数据
  trademarkList.value = result.records;
  total.value = result.total;
  // 返回数据
  return result;
};

// 组件挂在后调用接口，获取品牌列表的数据
onMounted(() => getTrademarkList());
</script>
  <style>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}
</style>
  
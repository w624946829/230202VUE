<template>
    <!-- 使用拉片组件进行包裹 -->
    <el-card class="box-card">
        <!-- 按钮 -->
        <template #header>
            <el-button type="primary" :icon="Plus" @click="showAddTrademark">添加</el-button>
        </template>
        <!-- 表格 -->
        <el-table v-loading="loading" :data="trademarkList" stripe border style="width: 100%">
            <el-table-column type="index" label="序号" width="80" align="center" />
            <el-table-column prop="name" label="品牌名称" width="180" />
            <el-table-column prop="address" label="品牌LOGO">
                <template #default="{ row, $index }">
                    <img :src="row.logoUrl" :alt="row.tmName" width="100" height="60" />
                </template>
                
            </el-table-column>
            <el-table-column label="操作">
                <template #default="{ row, $index }">
                    <el-button type="warning" :icon="Edit" size="small" @click="showUpdateTrademark">Warning</el-button>
                    <el-button type="danger" :icon="Delete" size="small">Danger</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <el-pagination style="margin-top: 20px" v-model:current-page="currentPage" v-model:page-size="pageSize"
            :page-sizes="[3, 6, 9]" background layout=" prev, pager, next, jumper,->,total, sizes," :total="total"
            @size-change="getTrademarkList(1, val)" @current-change="getTrademarkList(val, pageSize)" />
        <!-- 对话框 -->
        <el-dialog draggable v-model="dialogFormVisible" title="添加品牌">
            <el-form :model="trademark" style="width: 80%;">
                <el-form-item label="品牌名称" label-width="100px">
                    <el-input v-model="trademark.tmName" autocomplete="off" />
                </el-form-item>
                <el-form-item label="品牌Logo" label-width="100px">
                    <!-- 上传组件 -->
                    <el-upload class="avatar-uploader" :action="`${BASE_URL}/admin/product/fileUpload`"
                        :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                        <el-icon v-if="upLoading" class="avatar-uploader-icon">
                            <Loading />
                        </el-icon>
                        <img v-else-if="trademark.logoUrl" :src="trademark.logoUrl" class="avatar" />
                        <el-icon v-else class="avatar-uploader-icon">
                            <Plus />
                        </el-icon>
                        <template #tip>
                            <div class="el-upload__tip">只能上传jpg/png文件，且不超过50kb</div>
                        </template>
                    </el-upload>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取消</el-button>
                    <el-button type="primary" @click="dialogFormVisible = false">
                        确定
                    </el-button>
                </span>
            </template>
        </el-dialog>

    </el-card>
</template>
<script lang="ts">
export default {
    name: "Trademark",

};
</script>
<script lang="ts" setup>
// 引入图标组件
import { Plus, Edit, Delete } from "@element-plus/icons-vue";
// 引入消息提示框组件
import { ElMessage } from "element-plus";
// 引入ref等
import { ref, reactive } from "vue";
import { onMounted } from "vue";
import type { UploadProps, UploadRawFile } from 'element-plus'
const imageUrl = ref('')
// 引入品牌相关的数据类型
import type {
    TrademarkModel,
    TrademarkListModel,
    TrademarkPageModel,
} from "@/api/acl/product/model/trademarkModel";
// 引入添加品牌等相关皆苦
import {
    addOrUpdateTrademarkApi,
    deleteTrademarkByIdApi,
    getTrademarkListApi,
} from "@/api/acl/product/trademark";
const currentPage = ref<number>(1); //页码
const pageSize = ref<number>(3);
const total = ref<number>(0);

// 定义一个数组，用来存储品牌对象列表数据
const trademarkList = ref<TrademarkListModel>([]);
// 定义加载的效果
const loading = ref(false);

// 封装一个函数，用来调用接口，发送请求，获取品牌列表的数据
const getTrademarkList = async (
    page: number = currentPage.value,
    limit: number = pageSize.value
) => {
    currentPage.value = page;
    pageSize.value = limit;
    loading.value = true;
    // 调用接口发送请求，获取数据
    const result = await getTrademarkListApi(page, limit);
    loading.value = false;
    // 更新数组数据
    trademarkList.value = result.records;
    // 更新总条数数据
    total.value = result.total;
    ElMessage.success("品牌列表数据获取成功");
};
// 组件挂在后调用接口，获取品牌列表的数据
onMounted(() => {
    getTrademarkList();
});
// 对话框相关的数据的定义
const dialogFormVisible = ref(false)
const initTrademark = () => ({ id: undefined, tmName: '', logoUrl: '' })
const trademark = reactive<TrademarkModel>(initTrademark())

// 点击添加按钮对应的回调函数
const showAddTrademark = () => {
    dialogFormVisible.value = true
}
// 点击修改按钮对应的回调函数
const showUpdateTrademark = () => {
    dialogFormVisible.value = true
}

const upLoading = ref<boolean>(false)
const BASE_URL = import.meta.env.VITE_API_URL
// 图片上传成功的回调
const handleAvatarSuccess: UploadProps['onSuccess'] = (
  res
) => {
  trademark.logoUrl = res.data
  upLoading.value = false
}
// 图片上传之前的回调函数
const beforeAvatarUpload: UploadProps['beforeUpload'] = (file:UploadRawFile) => {
  const isJpegOrPng = ['image/jpeg','image/png'].includes(file.type)
  const isSize50k = file.size/1024<50

  
    if (!isJpegOrPng) {
    ElMessage.error('必须上超喜欢jpeg或者是png格式的图片')
    return false
  } 
  if (!isSize50k) {
    ElMessage.error('上传图片的大小不能超过50k')
    return false
  }
  upLoading.value = true
  return true
}

</script>
<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
<template>
  <!-- 使用卡片组件进行包裹 -->
  <el-card>
    <!-- 按钮 -->
    <template #header>
      <el-button type="primary" :icon="Plus" @click="showAddTrademark">添加</el-button>
    </template>
    <!-- 表格 -->
    <el-table v-loading="loading" :data="trademarkList" border style="width: 100%">
      <el-table-column type="index" label="序号" width="100" align="center" stripe />
      <el-table-column prop="tmName" label="品牌名称" />
      <el-table-column label="品牌LOGO">
        <template #default="{ row, $index }">
          <img :src="row.logoUrl" :alt="row.tmName" width="100" height="60" />
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="{ row, $index }">
          <el-button size="small" type="warning" :icon="Edit" @click="showUpdateTrademark(row)"></el-button>
          <el-button size="small" type="danger" :icon="Delete" @click="deleteTrademark(row)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->

    <div class="demo-pagination-block">
      <el-pagination style="margin-top: 20px" v-model="currentPage" v-model:page-size="pageSize" :page-sizes="[3, 6, 9]"
        background layout=" prev, pager, next, jumper,->,total,sizes, " :total="total"
        @size-change="getTrademarkList(1, $event)" @current-change="getTrademarkList($event, pageSize)" />
    </div>
  </el-card>

  <!-- 对话框 -->
  <el-dialog draggable v-model="dialogFormVisible" :title="`${trademark.id ? '修改品牌' : '添加品牌'}`">
    <el-form :model="trademark" style="width: 80%" ref="ruleFormRef" :rules="rules">
      <!-- 文本框 -->
      <el-form-item label="品牌名称" label-width="100px" prop="tmName">
        <el-input v-model="trademark.tmName" autocomplete="off" />
      </el-form-item>
      <el-form-item label="品牌LOGO" label-width="100px" prop="logoUrl">
        <!-- 上传 -->

        <el-upload class="avatar-uploader" :action="`${BASE_URL}/admin/product/fileUpload`" :show-file-list="false"
          :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
          <!-- 如果图片上传成功,显示图片,如果是上传的过程,要显示加载的效果,默认显示'+ 的效果-->
          <!-- 加载效果 -->
          <el-icon v-if="upLoading" class="avatar-uploader-icon">
            <Loading />
          </el-icon>
          <!-- 图片效果 -->
          <img v-else-if="trademark.logoUrl" :src="trademark.logoUrl" class="avatar" />
          <!-- '+'的效果 -->
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
        <el-button type="primary" @click="addOrUpdateTrademark">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
//   引入element-plus的组件
import { Plus, Edit, Delete, Loading } from "@element-plus/icons-vue";
//
import { ElMessage, formContextKey, ElMessageBox } from "element-plus";
// 引入ref
import { ref, onMounted, reactive } from "vue";
import type { UploadProps, FormRules, FormInstance } from "element-plus";
//引入品牌相关的数据类型
import type {
  TrademarkModel,
  TrademarkListModel,
  TrademarkPageModel,
} from "@/api/product/model/trademarkModel";
// 引入添加品牌，修改品牌，删除品牌，，根据页码和条数获取品牌列表的接口
import {
  addOrUpdateTrademarkApi,
  addTrademarkaApi,
  deleteTrademarkByIdApi,
  getTrademarkListApi,
} from "@/api/product/trademark";

const currentPage = ref<number>(1);
const pageSize = ref<number>(3);
const total = ref<number>(0);
// 定义一个数组，用来存储品牌对象列表数据
const trademarkList = ref<TrademarkListModel>([]);

const loading = ref(true);

// 封装一个函数用来调用接口发送请求，获取品牌列表的数据
const getTrademarkList = async (
  page: number = currentPage.value,
  limit: number = pageSize.value
) => {
  // 更新页码和每页条数的数据
  currentPage.value = page;
  pageSize.value = limit;

  // 修改加载的效果
  loading.value = true;

  // 调用接口，获取品牌列表的数据
  const result = await getTrademarkListApi(page, limit);
  loading.value = false;
  // 将获取到的数据赋值给品牌列表数据
  trademarkList.value = result.records;
  total.value = result.total;
  // 提示用户获取数据成功
  ElMessage.success("获取品牌列表数据成功");

  // 返回数据
  return result;
};

// 组件挂在后调用接口，获取品牌列表的数据
onMounted(() => getTrademarkList());

// 对话框相关的数据的定义
const dialogFormVisible = ref(false);
// 标准写法
// 定义一个对象，用来存储品牌对象的数据
const initTrademark = () => ({
  tmName: "",
  logoUrl: "",
  id: undefined,
});
const trademark = reactive<TrademarkModel>(initTrademark());

// 点击添加按钮对应的回调函数
const showAddTrademark = () => {
  // 每次都重置一次品牌相关的数据
  Object.assign(trademark, initTrademark());
  // 设置对话框显示
  dialogFormVisible.value = true;
  // 清理上一次的表单验证的提示信息，
  ruleFormRef.value?.clearValidate();
};
// 点击修改按钮对应的回调函数
const showUpdateTrademark = (row: TrademarkModel) => {
  // 应该吧品牌对象
  Object.assign(trademark, row);
  // 设置对话框显示
  dialogFormVisible.value = true;
  ruleFormRef.value?.clearValidate();
};

// 上传组件需要定义的数据
// 定义加载的效果的表达式
const upLoading = ref<boolean>(false);
// 上传图片的时候地址前面的根路径标识
const BASE_URL = import.meta.env.VITE_API_URL;
// 图片上传成功的回调函数
const handleAvatarSuccess: UploadProps["onSuccess"] = (res) => {
  // 上传成功后，需要把上传成功的图片地址保存到logoUrl属性中
  trademark.logoUrl = res.data; // 图片上传成功后的地址
  upLoading.value = false; // 关闭上传的加载效果
  ruleFormRef.value?.clearValidate("logoUrl");
};
// 上传图片之前的回调函数
const beforeAvatarUpload: UploadProps["beforeUpload"] = (file) => {
  // 上传图片的格式可以是jpeg也可以是png
  const isJpegOrPng = ["image/jpeg", "image/png"].includes(file.type);
  // 计算图片的大小
  const isSize50k = file.size / 1024 < 50;
  if (!isJpegOrPng) {
    ElMessage.error("上传图片的格式必须是jpg或者png");
    return false;
  }

  if (!isSize50k) {
    ElMessage.error("上传图片的大小不能超过50k");
    return false;
  }
  upLoading.value = true; // 打开上传的加载效果
  return true;
};

// 用来获取对话框组件中form组件标签的对象
const ruleFormRef = ref<FormInstance>();

const validatePass = (rule: any, value: any, callback: any) => {
  if (value.length < 2 || value.length > 10) {
    callback(new Error("品牌名称在2-10个字之间"));
  } else {
    callback();
  }
};

const rules = reactive<FormRules>({
  tmName: [
    { required: true, message: "必须要输入品牌名称", trigger: "blur" },
    // { min: 2, max: 10, message: '品牌名称在2-10个字之间', trigger: 'blur' },
    { validator: validatePass, trigger: "blur" },
  ],
  logoUrl: [
    {
      required: true,
      message: "必须要上传一个图片",
      trigger: "change",
    },
  ],
});

// 添加或者修改品牌对象数据 --- 操作的回调函数
const addOrUpdateTrademark = async () => {
  // 校验所有的表单验证是否都通过
  await ruleFormRef.value?.validate(async (valid) => {
    // 判断表单验证是否通过的依据就是valid是否为true
    if (!valid) return; // 如果表单验证没有通过，直接return
    try {
      // 添加或者修改品牌的接口
      await addOrUpdateTrademarkApi(trademark);
      // 提示消息
      ElMessage.success("操作成功");
      // 刷新
      getTrademarkList(trademark.id ? currentPage.value : 1);
      // 关闭对话框
      dialogFormVisible.value = false;
    } catch (error) {
      ElMessage.error("操作失败");
    }
  });
};

//  删除品牌操作的回调函数
const deleteTrademark = (row: TrademarkModel) => {
  // 弹出对话框
  // 调用接口
  // 提示消息

  ElMessageBox.confirm(`您确定要删除${row.tmName}吗？`, "提示", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      // 此时点击了确认按钮
      await deleteTrademarkByIdApi(row.id as number);
      ElMessage.success("删除成功");
      // 刷新
      if (trademarkList.value.length == 1 && currentPage.value > 1) {
        currentPage.value -= 1;
      }

      getTrademarkList();
    })
    .catch((error) => {
      // 点击了取消按钮
      ElMessage.error(error.message || "已经取消删除");
    });
};
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

.demo-pagination-block+.demo-pagination-block {
  margin-top: 10px;
}

.demo-pagination-block .demonstration {
  margin-bottom: 16px;
}
</style>

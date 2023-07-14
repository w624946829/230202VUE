<template>
    <!-- 使用卡片组件进行包裹 -->
    <el-card>
        <!-- 按钮 -->
        <template #header>
            <el-button type="primary" :icon="Plus" @click="showAddTrademark">添加</el-button>
        </template>
        <!-- 表格 -->
        <el-table v-loading="loading" :data="trademarkList" string border style="width: 100%">
            <el-table-column type="index" label="序号" width="80" align="center" />
            <el-table-column prop="tmName" label="品牌名称" width="180" />
            <el-table-column prop="logoUrl" label="品牌LOGO">
                <template #default="{ row, $index }">
                    <img :src="row.logoUrl" :alt="row.tmName" width="100" height="60">
                </template>

            </el-table-column>
            <el-table-column label="操作">
                <template #default="{ row, $index }">
                    <el-button type="warning" :icon="Edit" size="small" @click="showUpdateTrademark(row)"></el-button>
                    <el-button type="danger" :icon="Delete" size="small" @click="deleteTrademark(row)"></el-button>
                </template>

            </el-table-column>

        </el-table>
        <!-- 分页组件 -->
        <el-pagination style="margin-top:20px" v-model:current-page="currentPage" v-model:page-size="pageSize"
            :page-sizes="[3, 6, 9]" background layout=" prev, pager, next, jumper,->,total, sizes," :total="total"
            @size-change="getTrademarkList(1, $event)" @current-change="getTrademarkList($event, pageSize)" />
        <!-- 对话框 -->

        <el-dialog draggable v-model="dialogFormVisible" :title="`${trademark.id ? '修改品牌':'添加品牌'}`" >
            <el-form :model="trademark" style="width: 80%" ref="ruleFormRef" :rules="rules"
>
                <el-form-item label="品牌名称" label-width="100px" prop="tmName">
                    <el-input v-model="trademark.tmName" autocomplete="off" />
                </el-form-item>
                <el-form-item label="品牌LOGO" label-width="100px" prop="logoUrl">

                    <!-- 上传组件 -->
                    <el-upload class="avatar-uploader" :action="`${BASE_URL}/admin/product/fileUpload`"
                        :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                        <!-- 如果图片上传成功，显示图片，如果是上传的过程中，要显示加载的效果，默认显示的‘+’ 的效果 -->
                        <!-- 加载效果 -->
                        <el-icon v-if="upLoading" class="avatar-uploader-icon">
                            <Loading />
                        </el-icon>
                        <!-- 图片效果 -->
                        <img v-if="trademark.logoUrl" :src="trademark.logoUrl" class="avatar" />
                        <!-- + 的效果 -->
                        <el-icon v-else class="avatar-uploader-icon">
                            <Plus />
                        </el-icon>
                        <template #tip>
                            <div class="el-upload__tip">
                                只能上传jpg/png文件，且不超过50kb
                            </div>
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

    </el-card>
</template>
<script lang="ts">
export default {
    name: 'Trademark'
}
</script>
<script lang="ts" setup>
// 引入element-plus中的图标组件
import { Plus, Edit, Delete } from '@element-plus/icons-vue'
// 引入element-plus中的消息提示框组件
import { ElMessage, UploadProps, UploadRawFile, ElMessageBox } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
// 引入
import { onMounted, ref, reactive } from 'vue'
// 引入品牌相关的数据类型
import type { TrademarkModel, TrademarkListModel, TrademarkPageModel } from '@/api/product/model/trademarkModel';
import { addOrUpdateTrademarkApi, deleteTrademarkByIdApi, getTrademarkListApi } from '@/api/product/trademark';
const currentPage = ref<number>(1)//页码
const pageSize = ref<number>(3)//每页的条数
const total = ref<number>(0) //总条数
// 定义一个数组，用来存储品牌对象列表数据
const trademarkList = ref<TrademarkListModel>([])
//  应以加载的效果
const loading = ref(false)
//封装一个函数，用来调用接口，发送请求，获取品牌列表的数据
const getTrademarkList = async (page: number = currentPage.value, limit: number = pageSize.value) => {
    // 更新页码和每页条数的数据
    currentPage.value = page
    pageSize.value = limit
    loading.value = true
    // 调用接口，发送请求，获取数据
    const result = await getTrademarkListApi(page, limit)
    loading.value = false
    //更新数据
    // 更新数组数据
    trademarkList.value = result.records
    // 更新总条数数据
    total.value = result.total
    ElMessage.success('品牌列表获取成功')

}
// 组件挂在后调用接口，获取品牌列表的数据
onMounted(() => {
    getTrademarkList()
})

// 对话框相关的数据的定义


const dialogFormVisible = ref(false)

const initTrademark = () => ({ id: undefined, tmName: '', logoUrl: '' })

const trademark = reactive<TrademarkModel>(initTrademark())

// 点击添加按钮对应的回调函数
const showAddTrademark = () => {
    // 每次都重置一次品牌相关的数据
    Object.assign(trademark,initTrademark())
    // 设置对话框显示
    dialogFormVisible.value = true
    // 清理上一次的表单验证的提示信息
    ruleFormRef.value?.clearValidate()
}
// 点击修改按钮对应的回调函数
const showUpdateTrademark = (row:TrademarkModel) => {
    // 把品牌对象的数据重新拷贝一份
    Object.assign(trademark,row)
    // 设置对话框显示
    dialogFormVisible.value = true
    ruleFormRef.value?.clearValidate()
}

// 上传组件需要定义的数据
// 定义加载的效果的表达式表示
const upLoading = ref<boolean>(false)
// 上传图片的时候地址前面的根路径
const BASE_URL = import.meta.env.VITE_API_URL
// 图片上传成功的回调函数
const handleAvatarSuccess: UploadProps['onSuccess'] = (
    res
) => {
    // 当图片上传成功，需要把上传成功的图片地址保存到logUrl属性中
    trademark.logoUrl = res.data // 图片上传成功后的地址
    upLoading.value = false // 关闭上传的加载效果
    ruleFormRef.value?.clearValidate('logoUrl')
}
// 上传图片之前的回调函数
const beforeAvatarUpload: UploadProps['beforeUpload'] = (file) => {
    const isJpegOrPng = ['image/jpeg', 'image/png'].includes(file.type)
    const isSize50k = file.size / 1024 < 50
    if (!isJpegOrPng) {
        ElMessage.error('必须上传jpeg或者png格式的图片')
        return false
    }
    if (!isSize50k) {
        ElMessage.error('上传的图片的大小不能超出哦50kb')
        return false
    }
    upLoading.value = true
    return true
}
// 用来获取对话框组件中form组件标签对象的

const ruleFormRef = ref<FormInstance>()
const validateTmName = (rulr:any,value:any,callback:any)=>{
    if(value.length <2 || value.length > 10){
        callback(new Error('品牌名称的长度必须是2-10个字符'))
    }else{
        callback()
    }
}

    const rules = reactive<FormRules>({
  tmName: [
    { required: true, message: '必须要输入品牌名称', trigger: 'blur' },
    { validator:validateTmName, trigger: 'blur' },
  ],
        
  logoUrl:[
    {
        required:true,
        message:'必须要上传品牌的logo',
        trigger:'change'
    }
  ]
})

// 添加或者修改品牌对象数据---操作的回调函数
const addOrUpdateTrademark = async() =>{
    // 校验所有的表单验证是否都通过
    await ruleFormRef.value?.validate(async (valid)=>{
        //判断所有的表单校验是否通过就是valid的值
        if(!valid) return
        try {
            // 添加或者修改品牌的接口
            await addOrUpdateTrademarkApi(trademark)
            // 提示消息
            ElMessage.success('操作成功')
            // 刷新
            getTrademarkList(trademark.id?currentPage.value:1)
            // 关闭对话框
            dialogFormVisible.value = false
        } catch (error) {
            ElMessage.error('操作失败')
        }
    })
}
// 删除品牌操作的回调函数
const deleteTrademark = (row:TrademarkModel) =>{
    ElMessageBox.confirm(
    `您确定要删除${row.tmName}数据吗`,
    '提示',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    })
    .then(async () => {
        // 此时用户点击了确认按钮
      await deleteTrademarkByIdApi(row.id as number)
    //   提示信息
    ElMessage.success('操作成功')
    // 刷新
    if(trademarkList.value.length == 1 && currentPage.value > 1){
        currentPage.value -= 1 
    }
    getTrademarkList()
    })
    .catch((error) => {
      ElMessage.error(error.message || '已经取消删除')
    })
    

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
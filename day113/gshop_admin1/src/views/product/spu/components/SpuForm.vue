<template>
    <el-form labele-width="120px">
        <!-- SPU的名称 -->
        <el-form-item label="SPU名称">
            <el-input type="text" placeholder="请输入SPU名称" v-model="spuInfo.spuName"></el-input>
        </el-form-item>
        <!-- SPU的品牌 -->
        <el-form-item label="SPU品牌">
            <el-select placeholder="请选择" v-model="spuInfo.tmId">
                <el-option v-for="(tm, index) in trademarkList" :key="tm.id" :value="tm.id" :label="tm.tmName"></el-option>
            </el-select>
        </el-form-item>
        <!-- SPU描述 -->
        <el-form-item label="SPU描述">
            <el-input type="texterea" placeholder="请输入SPU描述" v-model="spuInfo.description"></el-input>
        </el-form-item>
        <!-- SPU图片 -->
        <el-form-item label="SPU图片">
            <!-- 上传的组件 -->

            <el-upload multiple v-model:file-list="spuInfo.spuImageList" :action="`${BASE_URL}/admin/product/fileUpload`"
                list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove"
                :on-success="handleAvatarSuccess">
                <el-icon>
                    <Plus />
                </el-icon>
            </el-upload>

            <el-dialog v-model="dialogVisible">
                <!-- 后面更换 -->
                <img w-full :src="dialogImageUrl" alt="Preview Image" />
            </el-dialog>

        </el-form-item>
        <!-- 销售属性 -->
        <el-form-item label="销售属性">
            <el-select placeholder="请选择" v-model="attrIdName">
                <el-option v-for="(attr, index) in baseSaleAttrList" :key="attr.id" :value="attr.id"
                    :label="attr.name"></el-option>
            </el-select>
            <!-- 按钮 -->
            <el-button type="primary" :icon="Plus">添加销售属性值</el-button>
            <!-- 表格 -->
            <el-table :data="spuInfo.spuSaleAttrList" string border style="width: 100%;margin-top: 20px;">
                <el-table-column type="index" label="序号" width="80" align="center" />
                <el-table-column prop="saleAttrName" label="属性名" width="150" />
                <el-table-column label="属性值名称列表">
                    <template #default="{ row, $index }">
                        <el-tag v-for="(attr, index) in row.spuSaleAttrValueList" :key="attr.id" closable
                            :disable-transitions="false" @close="row.spuSaleAttrValueList.splice(index, 1)"
                            style="margin-right: 5px;">
                            {{ attr.saleAttrValueName }}
                        </el-tag>
                        <el-input v-if="row.isShowEdit" :ref="(input: any) => inputRef[$index] = input"
                            v-model="saleAttrValueName" size="small" @keyup.enter="toView(row, $index)"
                            @blur="toView(row, $index)" />
                        <el-button v-else size="small" @click="toEdit" :icon="Plus"> </el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="操作" width="150" />





            </el-table>


        </el-form-item>
        <!-- 两个按钮 -->
        <el-form-item>
            <el-button type="primary">保存</el-button>
            <el-button @click="$emit('setCurrentShowStatus', ShowStatus.SPU_LIST)">取消</el-button>
        </el-form-item>



    </el-form>
</template>
<script lang="ts">
export default {
    name: 'SpuForm'
}
</script>
<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue'
import { Plus } from '@element-plus/icons-vue'
// 引入spu对象的相关类型
import type { SpuModel } from '@/api/product/model/spuModel';
// 引入枚举类型的数据
import { ShowStatus } from '../types';
import type { UploadProps, UploadUserFile, UploadFile, UploadFiles } from 'element-plus'
// 引入获取所有品牌的数组的api接口函数
import { getTrademarkListAllApi } from '@/api/product/trademark';
// 引入获取所有的基础销售属性数组的接口函数和spu对象所拥有的销售属性对象数组的接口api接口函数
import { getBaseSaleAttrListApi, getSpuImageListBySpuIdApi, getSpuSaleAttrListBySpuIdApi } from '@/api/product/spu';
// 引入品牌对象数组的类型
import type { TrademarkListModel } from '@/api/product/model/trademarkModel';
// 引入基础销售属性对象数组的类型
import type { BaseSaleAttrListModel } from '@/api/product/model/spuModel';
import type { SpuSaleAttrModel } from '@/api/product/model/spuModel';
// 接收父组件传递过来的spuInfo对象数据
const props = defineProps<{ currentSpu: SpuModel }>()
// 定义一个spuInfo对象数据
const spuInfo = reactive<SpuModel>(props.currentSpu)
// 接收父级组件传递过来的自定义事件，用来修改组件切换的表示数据
defineEmits(['setCurrentShowStatus'])
// 图片上传相关的数据和方法
// 上传图片的时候地址前面的根路径
const BASE_URL = import.meta.env.VITE_API_URL

const dialogImageUrl = ref('') // 存储浏览的图片的地址
const dialogVisible = ref(false) // 开启浏览的效果的标识
// 移除图片的方法
const handleRemove: UploadProps['onRemove'] = (uploadFile: UploadFile, uploadFiles: UploadFiles) => {
    // 如果删除一个图片，立刻更新存储图片的数组数据
    console.log(uploadFile, uploadFiles)
}
// 预览图片的方法
const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile: UploadFile) => {
    dialogImageUrl.value = uploadFile.url!
    dialogVisible.value = true
}
// 图片上传成功的回调函数
const handleAvatarSuccess: UploadProps['onSuccess'] = (res) => {
    // 当图片上传成功，需要把上传成功的图片地址保存到logUrl属性中
    // 清掉表单验证的提示信息
}



// 定义一个数组，用来存储品牌对象数组数据
const trademarkList = ref<TrademarkListModel>([])
// 获取所有品牌对象数组数据
onMounted(async () => {
    trademarkList.value = await getTrademarkListAllApi()
})

// 定义一个数组，用来存储基础销售属性对象数组数据
const baseSaleAttrList = ref<BaseSaleAttrListModel>([])
// 获取基础的销售属性数组数据
onMounted(async () => {
    baseSaleAttrList.value = await getBaseSaleAttrListApi()
})
// 获取spu对象所拥有的销售属性数组数据
onMounted(async () => {
    spuInfo.spuSaleAttrList = await getSpuSaleAttrListBySpuIdApi(spuInfo.id as number)
})
// 获取spu对象所拥有的图片数组数据
onMounted(async () => {
  const spuImageList = await getSpuImageListBySpuIdApi(spuInfo.id as number)
  // 为数组中的每个对象添加一个name和url属性
  spuInfo.spuImageList = spuImageList.map((item:any) => ({
    ...item,
    name: item.imgName,
    url: item.imgUrl
  }))
})
// 定义一个变量，用来存储选中的基础销售属性的数据
const attrIdName = ref<string>()
// 定义一个变量，用来收集某个文本框的对象
const inputRef = ref<HTMLInputElement[]>([])
// 定义一个变量，用来收集文本框中输入的数据
const saleAttrValueName = ref<string>('')
// 定义一个方法，用来实现文本框失去焦点的操作 --- 查看模式
const toView = (row: SpuSaleAttrModel, index: number) => {

}
// 按钮的点击事件对应的回调函数 --- 编辑模式
const toEdit = () => {

}
</script>
<style scoped></style>
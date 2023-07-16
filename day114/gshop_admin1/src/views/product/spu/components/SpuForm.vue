<template>
    <el-form labele-width="120px" ref="formRef" :model="spuInfo" :rules="rules">
        <!-- SPU的名称 -->
        <el-form-item label="SPU名称" prop="spuName">
            <el-input type="text" placeholder="请输入SPU名称" v-model="spuInfo.spuName"></el-input>
        </el-form-item>
        <!-- SPU的品牌 -->
        <el-form-item label="SPU品牌" prop="tmId">
            <el-select placeholder="请选择" v-model="spuInfo.tmId">
                <el-option v-for="(tm, index) in trademarkList" :key="tm.id" :value="tm.id" :label="tm.tmName"></el-option>
            </el-select>
        </el-form-item>
        <!-- SPU描述 -->
        <el-form-item label="SPU描述" prop="description">
            <el-input type="texterea" placeholder="请输入SPU描述" v-model="spuInfo.description"></el-input>
        </el-form-item>
        <!-- SPU图片 -->
        <el-form-item label="SPU图片" prop="spuImageList">
            <!-- 上传的组件 -->

            <el-upload multiple v-model:file-list="spuInfo.spuImageList" :action="`${BASE_URL}/admin/product/fileUpload`"
                list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove"
                :on-success="handleAvatarSuccess">
                <el-icon>
                    <Plus />
                </el-icon>
            </el-upload>

            <el-dialog v-model="dialogVisible">
                <!-- 图片标签 -->
                <el-image :src="dialogImageUrl" fit="fill" />
            </el-dialog>

        </el-form-item>
        <!-- 销售属性 -->
        <el-form-item label="销售属性" prop="spuSaleAttrList">
            <el-select :placeholder="saleAttrText" v-model="attrIdName">
                <el-option v-for="(attr, index) in baseSaleAttrList" :key="attr.id" :value="attr.id +'_'+attr.name "
                    :label="attr.name"></el-option>
            </el-select>
            <!-- 按钮 -->
            <el-button type="primary" :icon="Plus" @click="addAttr" :disabled="!unSelectSaleAttrList.length">添加销售属性值</el-button>
        </el-form-item>
    <el-form-item >
            <!-- 表格 -->
            <el-table :data="spuInfo.spuSaleAttrList" string border style="width: 100%;margin-top: 20px;">
                <el-table-column type="index" label="序号" width="80" align="center" />
                <el-table-column prop="saleAttrName" label="属性名" width="150" />
                <el-table-column label="属性值名称列表">
                    <template #default="{ row, $index }">
                        <el-tag v-for="(attr, index) in row.spuSaleAttrValueList" :key="attr.id" closable
                            :disable-transitions="false" @close="row.spuSaleAttrValueList.splice(index, 1)"
                            style="margin-right: 5px;" type="success">
                            {{ attr.saleAttrValueName }}
                        </el-tag>
                        <el-input v-if="row.isShowEdit" :ref="(input: any) => inputRef[$index] = input"
                            v-model="saleAttrValueName" size="small" @keyup.enter="$event.target.blur()"
                            @blur="toView(row, $index)"  style="width: 100px;"/>
                        <el-button v-else size="small" @click="toEdit(row,$index)" :icon="Plus"> </el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="操作" width="150" >


                <template #default = "{row,$index}">
                    <el-button type="danger" :icon="Delete" size="small" @click="spuInfo.spuSaleAttrList.splice($index,1)"></el-button>
                    
                </template>

                </el-table-column>


            </el-table>


        </el-form-item>
        <!-- 两个按钮 -->
        <el-form-item>
            <el-button type="primary" @click="saveSpuInfo">保存</el-button>
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
import { ref, reactive, onMounted, computed,nextTick } from 'vue'
import { Plus,Delete } from '@element-plus/icons-vue'
// 引入spu对象的相关类型
import type { SpuModel } from '@/api/product/model/spuModel';
// 引入枚举类型的数据
import { ShowStatus } from '../types';
import { type UploadProps, type UploadUserFile, type UploadFile, type UploadFiles, ElMessage,type FormInstance,type FormRules } from 'element-plus'
// 引入获取所有品牌的数组的api接口函数
import { getTrademarkListAllApi } from '@/api/product/trademark';
// 引入获取所有的基础销售属性数组的接口函数和spu对象所拥有的销售属性对象数组的接口api接口函数
import { getBaseSaleAttrListApi, getSpuImageListBySpuIdApi, getSpuSaleAttrListBySpuIdApi,addOrUpdateSpuInfo } from '@/api/product/spu';
// 引入品牌对象数组的类型
import type { TrademarkListModel } from '@/api/product/model/trademarkModel';
// 引入基础销售属性对象数组的类型
import type { BaseSaleAttrListModel,SpuImageListModel } from '@/api/product/model/spuModel';
import type { SpuSaleAttrModel } from '@/api/product/model/spuModel';
// 引入三级的分类的仓库
import { useCategoryStore } from '@/stores/category' ;
// 获取仓库的对象
const categoryStore = useCategoryStore();
// 接收父组件传递过来的spuInfo对象数据
const props = defineProps<{ currentSpu: SpuModel }>()
// 定义一个spuInfo对象数据
const spuInfo = reactive<SpuModel>(props.currentSpu)
// 接收父级组件传递过来的自定义事件，用来修改组件切换的表示数据
const emits = defineEmits(['setCurrentShowStatus'])
// 图片上传相关的数据和方法
// 上传图片的时候地址前面的根路径
const BASE_URL = import.meta.env.VITE_API_URL

const dialogImageUrl = ref('') // 存储浏览的图片的地址
const dialogVisible = ref(false) // 开启浏览的效果的标识

// 预览图片的方法
const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile: UploadFile) => {
    dialogImageUrl.value = uploadFile.url!
    dialogVisible.value = true
}
// 图片上传成功的回调函数
const handleAvatarSuccess: UploadProps['onSuccess'] = (res:any,uploadFile:UploadFile,uploadFiles:UploadFiles) => {
    // 当图片上传成功，立即更新存储图片对象的数组
    spuInfo.spuImageList = uploadFiles as any
    // 清掉表单验证的提示信息
    formRef.value?.clearValidate()
}

// 移除图片的方法
const handleRemove: UploadProps['onRemove'] = (uploadFile: UploadFile, uploadFiles: UploadFiles) => {
    // 如果删除一个图片，立刻更新存储图片的数组数据
    spuInfo.spuImageList = uploadFiles as any
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
    const id = spuInfo.id 
    if(!id) return
    spuInfo.spuSaleAttrList = await getSpuSaleAttrListBySpuIdApi(spuInfo.id as number)
    id
})
// 获取spu对象所拥有的图片数组数据
onMounted(async () => {
    const id = spuInfo.id 
    if(!id) return
  const spuImageList = await getSpuImageListBySpuIdApi(id)
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

    // 判断数据是否有意义
    if(!saleAttrValueName.value || !saleAttrValueName.value.trim()){
        ElMessage.warning('请输入有效数据')//提示
        saleAttrValueName.value = '' // 清空数据
        row.isShowEdit = false // 查看模式
        return 
    }
    // 判断数据是否有重复
    const isRepeat = row.spuSaleAttrValueList.some((item)=>item.saleAttrValueName === saleAttrValueName.value)
    if(isRepeat){
        ElMessage.warning('数据重复')//提示
        return 
    } else{
        // 向销售属性值对象数组中添加一个新的对象数据
        row.spuSaleAttrValueList.push({
            baseSaleAttrId:row.baseSaleAttrId,//所属销售属性对象的id标识
            saleAttrValueName:saleAttrValueName.value // 属性值名字
        })
    }
    saleAttrValueName.value = ' ' 
    row.isShowEdit = false // 
}
// 按钮的点击事件对应的回调函数 --- 编辑模式
const toEdit = (row: SpuSaleAttrModel, index: number) => {
    row.isShowEdit = true // 设置文本框的出现
    nextTick(()=>{// 设置文本框自动获取焦点
        inputRef.value[index].focus()
    })
}
// 添加销售属性的按钮的点击事件的回调函数
const addAttr =()=>{
    //判断是否选中的内容
    if(!attrIdName.value) return 
    const [id,name] = attrIdName.value.split('_')
    // 获取了选中的销售属性的id
    // 想表格绑定中的数组中添加一个对象
    spuInfo.spuSaleAttrList.push({
        saleAttrName:name,//属性的名字
        baseSaleAttrId:+id,//属性的id
        spuSaleAttrValueList:[]//属性值的数组 
    })
    attrIdName.value = '' //清空选中的内容
}
// 计算属性，计算剩余的销售属性数据
const unSelectSaleAttrList = computed(()=>{
   
    // 过滤掉已经选中的销售属性的id
    return baseSaleAttrList.value.filter(bsa=>!spuInfo.spuSaleAttrList.some(sa=>sa.saleAttrName === bsa.name))
})
// 计算属性，计算提示信息内容
const saleAttrText = computed(()=>{
    const {length} = unSelectSaleAttrList.value //取出数组的长度
    return length ? `还有${length } 个销售属性` : '没有了'
})

// 定义变量用来存储 el-form 对象
const formRef = ref<FormInstance>()
// 表单验证规则
const rules = reactive<FormRules>({
    // 品牌的id
    tmId: [{ required: true, message: '请选择一个品牌', trigger: 'change' }],
    // spu的名字
    spuName: [{ required: true, message: '请输入SPU名称', trigger: 'blur' }],
    // spu的描述
    description: [{ required: true, message: '请输入SPU描述信息', trigger: 'blur' }],
    // spu的销售属性
    spuSaleAttrList: [{type:'array',  required: true, message: '至少选择一个销售属性', trigger: 'change' }],
    // spu的图片
    spuImageList: [{type:'array', required: true, message: '至少上传一张图片', trigger: 'change' }],
})

// 添加或者修改spu数据
const saveSpuInfo = ()=>{
    formRef.value?. validate(async (valid)=>{
        // 表单验证通过后
        if(!valid) return
        // 重新更新三级分类id数据
        spuInfo.category3Id = categoryStore.getCategory3Id
        // 1、销售属性数据的过滤操作，（属性值对象数组如果没有数据，过滤掉，isShowEdit属性也不需要）
        spuInfo.spuSaleAttrList = spuInfo.spuSaleAttrList.filter(item=>{
            // 判断销售属性对象中的销售属性值对象数组是否有数据
            if(!item.spuSaleAttrValueList.length) return false
            delete item.isShowEdit // 
            return true
        })
        // 2、图片对象数组中的数据也需要过滤
        spuInfo.spuImageList = spuInfo.spuImageList.map(item =>({
            spuId:spuInfo.id,//id数据
            imgName:item.imgName||item.name,
            imgUrl:item.response?item.response.data:item.url
        }))as SpuImageListModel
        // 3、二次销售属性数据的过滤
        if(!spuInfo.spuSaleAttrList.length) return 
        // 4、调用接口发送请求---添加\修改
        try {
            await addOrUpdateSpuInfo(spuInfo)
            ElMessage.success('操作成功')
            // 分发自定义事件
            emits('setCurrentShowStatus',ShowStatus.SPU_LIST)
        } catch (error:any) {
            ElMessage.error(error.message||'保存失败')
        }
    })
}

</script>
<style scoped></style>
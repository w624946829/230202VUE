<template>
    <el-form label-width="120px" :model="skuInfo" :rules="rules" ref="formRef">
        <!-- spu名称 -->
        <el-form-item label="SPU名称">{{ props.spu.spuName }}</el-form-item>
        <!-- SKU名称 -->
        <el-form-item label="SKU名称" prop="skuName">
            <el-input type="text" placeholder="请输入SKU名称" v-model="skuInfo.skuName"></el-input>
        </el-form-item>
        <!-- 价格 -->
        <el-form-item label="价格（元）" prop="price">
            <el-input type="number" placeholder="请输入价格" v-model="skuInfo.price"></el-input>
        </el-form-item>
        <!-- 重量 -->
        <el-form-item label='重量（千克）' prop="weight" >
            <el-input type="number" placeholder="请输入重量" v-model="skuInfo.weight"></el-input>
        </el-form-item>
        <!-- 规格描述 -->
        <el-form-item label="规格描述" prop="skuDesc" >
            <el-input type="textarea" placeholder="请输入SKU规格描述" rows="4" v-model="skuInfo.skuDesc"></el-input>
        </el-form-item>
        <!-- 平台属性 -->
        <el-form-item label="平台属性" prop="skuAttrValueList">
      <el-form inline>
        <el-form-item v-for="(attr,index) in attrValueList" :key="attr.id" :label="attr.attrName" style="margin-bottom:10px">
          <el-select placeholder="请选择" v-model="skuInfo.skuAttrValueList[index]">
            <el-option v-for="(val,index) in attr.attrValueList" :key="val.id" :value="val.id + '_' + attr.id" :label="val.valueName"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
        <!-- 销售属性 -->
        <el-form-item label="销售属性" prop="skuSaleAttrValueList">
            <el-form inline>
                <el-form-item v-for="(attr,index) in saleAttrValueList" :key="attr.id" :label="attr.saleAttrName" style="margin-bottom: 10px;">
                    <el-select placeholder="请选择" v-model="skuInfo.skuSaleAttrValueList[index]">
                        <el-option v-for="(val,index) in attr.spuSaleAttrValueList" :key="val.id" :value="val.id" :label="val.saleAttrValueName"></el-option>
                    </el-select>
                </el-form-item>
                
            </el-form>
        </el-form-item>
        <!-- 表格 -->
        <el-form-item label="图片列表" prop="skuImageList">
            <el-table ref="tableRef" :data="skuImageList" stripe border style="width: 100%" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" />
                <el-table-column prop="" label="图片" >
                    <template #default="{ row, $index }">
                        <el-image :src="row.imgUrl" style="width: 100px; height: 100px"></el-image>
                    </template>
                </el-table-column>
                <el-table-column prop="imgName" label="名称" />
                <el-table-column label="操作">
                    <template #default="{ row, $index }">
                        <el-tag type="success" v-if="row.isDefault === 1">默认</el-tag>
                        <el-button type="primary" size="small" v-else @click="setDefault(row)">设置为默认</el-button>
                        
                    </template>
                </el-table-column>
            </el-table>
        </el-form-item>
        <!-- 两个按钮 -->
        <el-form-item>
            <el-button type="primary" @click="saveSkuInfo">保存</el-button>
            <el-button @click="$emit('setCurrentShowStatus',ShowStatus.SPU_LIST)">取消</el-button>
        </el-form-item>

    </el-form>
</template>
<script lang="ts">
export default {
    name: 'SkuForm'
}
</script>
<script lang="ts" setup>
import { ref, reactive,nextTick,onMounted } from 'vue'
import type { SkuModel } from '@/api/product/model/skuModel';
import type { SpuModel, SpuImageModel, SpuImageListModel,SpuSaleAttrListModel } from '@/api/product/model/spuModel';
import type { FormRules, FormInstance } from 'element-plus'
import { ShowStatus } from '../types';
import { ElMessage, ElTable } from 'element-plus'
// 引入平台属性数组的类型
import { type AttrValueModel, type AttrValueListModel, AttrInfoListModel } from '@/api/product/model/attrModel';
// 引入获取平台属性的接口函数
import { getAttrInfoListApi } from '@/api/product/attr';
// 引入spu对象中所拥有的销售属性数组的api接口函数
import { getSpuSaleAttrListBySpuIdApi,getSpuImageListBySpuIdApi } from '@/api/product/spu';
// 引入分类的信息仓库
import { useCategoryStore } from '@/stores/category';
// 引入添加或者修改sku的接口函数
import { addOrUpdateSkuInfoApi } from '@/api/product/sku';
// 分类的信息仓库
const categoryStore = useCategoryStore()
// 通过interface定义
interface Props {
    spu: {
        id: number,
        spuName: string
    }
}
const emits = defineEmits(['setCurrentShowStatus', 'setCurrentSpuInfo'])
// 泛型约束，约束或者是限制了，父级组件向当前组件传递的数据必须是对象，里面有id和spuName属性
const props = defineProps<Props>()
const initSkuInfo = (): SkuModel => ({

    // spuId?: number, // spu的id标识
    price: 0, // 价格
    tmId: undefined, // 所属品牌的id标识
    // category3Id?: number // 所属三级分类的id标识
    skuName: '', // sku的名字
    skuDesc: '', // sku的描述
    weight: 0, // 重量
    isSale: 1, // 是否上架
    skuDefaultImg: '', // 默认图片
    skuImageList: [], // 图片对象数组
    skuAttrValueList: [], // 平台属性对象数组
    skuSaleAttrValueList: [], // 销售属性对象数组

})
const skuInfo = reactive<SkuModel>(initSkuInfo())

 

// 定义变量用来存储
const formRef = ref<FormInstance>()
// 表单的验证规则
const rules = reactive<FormRules>({
   
    // sku的名字
    skuName: [{ required: true, message: '请输入SKU名称', trigger: 'blur' },],
    // 价格  
    price: [{ required: true, message: '请输入SKU价格', trigger: 'blur' },],
    // 重量
    weight: [{ required: true, message: '请输入SKU重量', trigger: 'blur' },],
    // 规格
    skuDesc: [{ required: true, message: '请输入SKU规格描述', trigger: 'blur' },],
    // 平台属性
    skuAttrValueList: [{ type: 'array', required: true, message: '至少选择一个平台属性', trigger: 'change' },],
    // 销售属性
    skuSaleAttrValueList: [{ type: 'array', required: true, message: '至少选择一个销售属性', trigger: 'change' },],
    // 图片列表
    skuImageList: [{ type: 'array', required: true, message: '至少选择一个图片', trigger: 'change' },],
})

// 定义用来存储所有平台属性数组的数组
const skuAttrValueList = ref<AttrInfoListModel>([])

// 定义用来存储spu对象中所拥有的销售属性数据数组
const saleAttrValueList = ref <SpuSaleAttrListModel>([])
// 定义用来存储spu对象中所拥有的图片数据数组
const skuImageList = ref<SpuImageListModel>([])

// 组件挂载的时候调用相关的接口，获取数据，存储数据，在模板中使用
// 定义用户来存储所有平台属性数据的数组
const attrValueList = ref<AttrInfoListModel>([])

// 获取平台属性数据数组
onMounted(async ()=>{
    // 调用接口，获取平台属性对象数组数据
    attrValueList.value =await getAttrInfoListApi({
        category1Id:categoryStore.getCategory1Id,
        category2Id:categoryStore.getCategory2Id,
        category3Id:categoryStore.getCategory3Id,
    
    })
})
// 定义变量用来存储table的对象
const tableRef = ref<InstanceType<typeof ElTable>>()
    
// 获取spu对象所拥有的销售属性数据
onMounted(async ()=>{
    // 调用接口，获取spu的销售属性对象数组数据
    saleAttrValueList.value = await getSpuSaleAttrListBySpuIdApi(props.spu.id)
})
// 获取spu对象所拥有的图片数据
onMounted(async ()=>{
    // 调用接口，获取spu的图片对象数组数据
    skuImageList.value = await getSpuImageListBySpuIdApi(props.spu.id)
//    设置所有的图片没有默认
    skuImageList.value.forEach(item=>{
        item.isDefault = 0
    })
    // 设置第一个图片为默认
    skuImageList.value[0].isDefault = 1
    // 存储默认选中的图片的地址
    skuInfo.skuDefaultImg = skuImageList.value[0].imgUrl
    nextTick(()=>{
        // 设置第一个图片选中
        tableRef.value!.toggleRowSelection(skuImageList.value[0], true)
    })
    
})


// 表格中的选中项状态发生变化时出发
const handleSelectionChange = (val:SpuImageListModel) => {
    // 立刻存储到sku对象的图片数组中
    skuInfo.skuImageList = val
}

// 设置某个图片默认
const setDefault = (row:SpuImageModel)=>{
    // 拍他
    skuImageList.value.forEach(item=>{
        item.isDefault = 0
    })
    // 设置某个图片为默认
    row.isDefault = 1
    // 存储默认图片的地址
    skuInfo.skuDefaultImg = row.imgUrl
    tableRef.value!.toggleRowSelection(row, true)
}

const saveSkuInfo = ()=>{
    console.log(skuInfo.skuAttrValueList)
    // 表单验证是否通过
    formRef.value?.validate(async (valid)=>{
        // 是否全部的验证都通过
        if(!valid) return false
        try {
            await addOrUpdateSkuInfoApi({
            ...skuInfo,
            spuId:props.spu.id,// spu的id标识
            category3Id:categoryStore.getCategory3Id,//三级的分类的id
            skuAttrValueList:skuInfo.skuAttrValueList.map(item=>{
                // 结构出属性值的id和属性对象的id
                const [valueId,attrId] = (item as any).split('_')
                return {
                    attrId,
                    valueId
                }
            }),
            // 过滤销售属性数据
            skuSaleAttrValueList:skuInfo.skuSaleAttrValueList.map((item)=>{
                return {
                    saleAttrValueId: +item
                }
            }),//销售属性对象数组
            // 过滤图片数组数据
            skuImageList: skuInfo.skuImageList.map((item) => ({
          imgName: item.imgName, // 图片名字
          imgUrl: item.imgUrl, // 图片的地址
          spuImgId: item.spuId // 所属spu的id标识
        })) // 图片对象数组
            // 平台属性对象数组
        })
        ElMessage.success('保存成功')
        // 关闭界面
        emits('setCurrentShowStatus',ShowStatus.SPU_LIST)
        } catch (error:any) {
            ElMessage.error(error.message||'保存失败')
        }
 })        
}


</script>
<style scoped></style>
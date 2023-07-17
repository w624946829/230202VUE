<template>
    <el-form label-width="120px" :model="skuInfo" :rules="rules" :ref="formRef">
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
                <el-form-item label="手机系统" style="margin-bottom: 5px;">
                    <el-select placeholder="请选择" v-model="skuInfo.skuAttrValueList[0]">
                        <el-option value="1" label="安卓系统"></el-option>
                        <el-option value="2" label="ios系统"></el-option>

                    </el-select>
                </el-form-item>
                <el-form-item label="手机系统" style="margin-bottom: 5px;">
                    <el-select placeholder="请选择" v-model="skuInfo.skuAttrValueList[1]">
                        <el-option value="1" label="安卓系统"></el-option>
                        <el-option value="2" label="ios系统"></el-option>
                    </el-select>
                </el-form-item>
                
            </el-form>
        </el-form-item>
        <!-- 销售属性 -->
        <el-form-item label="销售属性" prop="skuSaleAttrValueList">
            <el-form inline>
                <el-form-item label="手机系统" style="margin-bottom: 5px;">
                    <el-select placeholder="请选择" v-model="skuInfo.skuAttrValueList[0]">
                        <el-option value="1" label="安卓系统"></el-option>
                        <el-option value="2" label="ios系统"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="手机系统" style="margin-bottom: 5px;">
                    <el-select placeholder="请选择" v-model="skuInfo.skuAttrValueList[1]">
                        <el-option value="1" label="安卓系统"></el-option>
                        <el-option value="2" label="ios系统"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </el-form-item>
        <!-- 表格 -->
        <el-form-item label="图片列表" prop="skuImageList">
            <el-table :data="spuImageList" stripe border style="width: 100%">
                <el-table-column type="selection" width="55" />
                <el-table-column prop="" label="图片" />
                <el-table-column prop="" label="名称" />
                <el-table-column label="操作">
                    <template #default="{ row, $index }">
                        <el-button type="primary" size="small">设置为默认</el-button>

                    </template>
                </el-table-column>
            </el-table>
        </el-form-item>
        <!-- 两个按钮 -->
        <el-form-item>
            <el-button type="primary">保存</el-button>
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
import { ref, reactive } from 'vue'
import type { SkuModel } from '@/api/product/model/skuModel';
import type { SpuModel, SpuImageModel, SpuImageListModel } from '@/api/product/model/spuModel';
import type { FormRules, FormInstance } from 'element-plus'
import { ShowStatus } from '../types';
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
const skuInfo = ref<SkuModel>(initSkuInfo())

const spuImageList = ref<SpuImageListModel>([])

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

// 可以通过defineProps()方法接收传递过的数据

</script>
<style scoped></style>
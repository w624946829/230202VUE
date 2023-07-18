<template>
    <div>
       <el-card shadow="always">
        <!-- 分类选择器相关的组件 -->
        <CategorySelector />
       </el-card> 
       <el-card shadow="always" style="margin-top: 20px;">
        <!--SpuList组件，用来展示spu列表数据的  -->
        <SpuList v-if="showStatus === ShowStatus.SPU_LIST" @setCurrentShowStatus = "setCurrentShowStatus" @setCurrentSpuInfo="setCurrentSpuInfo"/>
        <!--SpuForm组件，用来展示spu对象数据的  -->
        <SpuForm v-else-if ="showStatus === ShowStatus.SPU_FORM" @setCurrentShowStatus = "setCurrentShowStatus"
        :currentSpu="currentSpu"/>
        <!-- SkuForm组件，用来添加sku对象数据的 -->
        <SkuForm v-else ="showStatus === ShowStatus.SKU_FORM"  @setCurrentShowStatus = "setCurrentShowStatus" 
        :spu="{id:currentSpu.id as number,spuName:currentSpu.spuName as string}"/>
       </el-card> 

    </div>
</template>
<script lang="ts">
export default {
    name: 'Spu'
}
</script>
<script lang="ts" setup>
// 引入分类的组件
import CategorySelector from '@/components/CategorySelector/index.vue' 
import SpuForm from './components/SpuForm.vue'
import SpuList from './components/SpuList.vue'
import SkuForm from './components/SkuForm.vue'
//引入枚举类型的标识类型 
import  {ShowStatus} from './types'
import {ref,reactive} from 'vue'
import { SpuModel } from '@/api/product/model/spuModel'
// 定义一个枚举类型的标识数据
const showStatus = ref<ShowStatus>(ShowStatus.SPU_LIST)

// 用来修改枚举类型数据的方法 --- 自定义事件的回调函数
const setCurrentShowStatus = (val:ShowStatus)=>{
    showStatus.value = val
}
// 用来初始化spu对象数据的方法
const initSpuInfo = ():SpuModel=>({
    tmId:undefined,
    category3Id:undefined,
    spuName:'',//spu的名字
    description:'',//描述信息
    spuSaleAttrList:[],//销售属性对象数组
    spuImageList:[],//图片对象数组
})
// 定义一个spuInfo的对象变量
const currentSpu = ref<SpuModel>(initSpuInfo())

// 用来接收子集组件传递过来的spuInfo对象数据
const setCurrentSpuInfo = (currentSpuInfo:SpuModel = initSpuInfo())=>{
   
    
    currentSpu.value = currentSpuInfo //存储传递过来的spu对象数据
}



</script>
<style scoped>
</style>
<template>
    <div>
       <el-card shadow="always">
        <!-- 分类选择器相关的组件 -->
        <CategorySelector/>
       </el-card> 
       <el-card shadow="always" style="margin-top: 20px;">
        <!--SpuList组件，用来展示spu列表数据的  -->
        <SpuList v-if="showStatus === ShowStatus.SPU_LIST"/>
        <!--SpuForm组件，用来展示spu对象数据的  -->
        <SpuForm v-else-if ="showStatus === ShowStatus.SPU_FORM"/>
        <!-- SkuForm组件，用来添加sku对象数据的 -->
        <SkuForm v-else ="showStatus === ShowStatus.SKU_FORM"/>
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
import {ref} from 'vue'
// 定义一个枚举类型的标识数据
const showStatus = ref<ShowStatus>(ShowStatus.SPU_LIST)
</script>
<style scoped>
</style>
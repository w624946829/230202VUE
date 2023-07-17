<template>
    <el-form inline>
        <el-form-item label="一级分类">
            <el-select v-model="category1Id"  :disabled="isDisabled">
                <el-option v-for="(c1,index) in categoryStore.category1List" :key="c1.id"
               
                :value="c1.id" :label="c1.name" ></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="二级分类">
            <el-select v-model="category2Id" :disabled="isDisabled">
                <el-option v-for="(c2,index) in categoryStore.category2List" :key="c2.id" 
                :value="c2.id" :label="c2.name" ></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="三级分类">
            <el-select v-model="category3Id" :disabled="isDisabled">
                <el-option v-for="(c3,index) in categoryStore.category3List" :key="c3.id" 
                :value="c3.id" :label="c3.name" ></el-option>
            </el-select>
        </el-form-item>
    </el-form>
    
</template>
<script lang="ts">
export default {
    name: 'CategorySelector'
}
</script>
<script lang="ts" setup>
import {onMounted, computed} from 'vue'
import {useCategoryStore} from '@/stores/category'
// 组件加载完毕后，调用接口，发送请求，获取一级分类数组数据（分发action）
const categoryStore = useCategoryStore()
onMounted(() => {
    categoryStore.getCategoryList1()
})
const category1Id = computed({
    get(){
        return categoryStore.category1Id as number
    },
    set(val:number){
        categoryStore.getCategoryList2(val)
    },
})
const category2Id = computed({
    get(){
        return categoryStore.category2Id as number
    },
    set(val:number){
        categoryStore.getCategoryList3(val)
    },  
})
const category3Id = computed({
    get(){
        return categoryStore.category3Id as number
    },
    set(val:number){
        categoryStore.category3Id = val
    },  
})

// 接收父级组件传递过来的数据
defineProps({
    isDisabled:{
        type:Boolean,
        default:false
    }
})

</script>
<style scoped>
</style>
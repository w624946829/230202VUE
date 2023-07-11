<template>
    <el-form inline>
        <!-- 一级分类 -->
        <el-form-item label="一级分类">
            <el-select v-model="category1Id">
                <el-option v-for="(c1,index) in categoryStore.category1List" :key="c1.id" :value="c1.id" :label="c1.name" ></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="二级分类">
            <el-select v-model="category2Id">
                <el-option v-for="(c2,index) in categoryStore.category2List" :key="c2.id" :value="c2.id" :label="c2.name" ></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="三级分类">
            <el-select v-model="category3Id">
                <el-option v-for="(c3,index) in categoryStore.category3List" :key="c3.id" :value="c3.id" :label="c3.name" ></el-option>
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
import { useCategoryStore } from '@/stores/category'
import { onMounted,computed } from 'vue';
// 获取分类信息的仓库对象
const categoryStore = useCategoryStore()
// 组件加载完成后，调用接口，发送请求
onMounted(()=>{
    categoryStore.getCategoryList1()
    console.log(1111);
    
})
const category1Id = computed({
    get(){
        return categoryStore.category1Id as number
    },
    set(val:number){
        // 一级分类选中的信息发生了变化 ---- 1id的值发生了变化
        categoryStore.getCategoryList2(val)
    }
})

const category2Id = computed({
    get(){
        return categoryStore.category2Id as number
    },
    set(val:number){
        // 二级分类选中的信息发生了变化 ---- 2id的值发生了变化
        categoryStore.getCategoryList3(val)
    }
})
const category3Id = computed({
    get(){
        return categoryStore.category3Id as number
    },
    set(val:number){
        categoryStore.category3Id = val
    }
})
</script>
<style scoped>
</style>
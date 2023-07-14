<template>
    <div>
        <template>
            <el-form label-width="120px">
                <!-- spu 名称 -->
                <el-form-item label="SPU名称">
                    <el-input type="text" placeholder="请输入SPU名称"></el-input>
                </el-form-item>
                <!-- SPU品牌 -->
                <el-form-item label="SPU品牌">
                    <el-select placeholder="请选择">
                        <el-option value="1" label="大米"></el-option>
                        <el-option value="2" label="小米"></el-option>
                    </el-select>
                </el-form-item>
                <!-- spu 描述 -->
                <el-form-item label="SPU描述">
                    <el-input type="textarea" placeholder="请输入SPU描述"></el-input>
                </el-form-item>
                <!-- SPU图片 -->
                <el-form-item label="SPU图片">
                    <!-- 上传的组件 -->
                </el-form-item>
                <!-- 销售属性 -->
                <el-form-item label="销售属性">
                    <el-select placeholder="请选择品牌">
                        <el-option value="1" label="大米"></el-option>
                        <el-option value="2" label="小米"></el-option>
                    </el-select>
                    <!-- 表格 -->


                </el-form-item>

                <!-- 两个按钮 -->
                <el-form-item>
                    <el-button type="primary">保存</el-button>
                    <el-button @click="$emit('setCurrentShowStatus', ShowStatus.SPU_LIST)">取消</el-button>
                </el-form-item>
            </el-form>
        </template>

    </div>
</template>
<script lang="ts">
export default {
    name: 'SpuForm'
}
</script>
<script lang="ts" setup>
// 引入spu独享的相关类型 
import type { SpuModel } from '@/api/product/model/spuModel';
// 引入枚举的类型
import { ShowStatus } from '../types';
// 接收父级组件传递过来的spuInfo对象数据
const props = defineProps<{currentSpu:SpuModel}>()
// 接收父级组件传递过来的自定义使用，用来修改组件切换的标识数据
defineEmits(['setCurrentShowStatus'])

</script>
<style scoped></style>
<template>
  <div class="box">
    <h1>组件间通信6: $attrs与$listeners</h1>
    <h2>需求: 自定义带Hover提示的按钮</h2>
    <!-- <el-button type="success" size="small" :icon="Plus">按钮</el-button>
    <el-button type="warning" size="default" :icon="Edit">按钮</el-button>
    <el-button type="danger" size="large " :icon="Delete">按钮</el-button> -->
    <HintButton title="增加" type="success" size="small" :icon="Plus" @click="add" />
    <HintButton title="修改" type="warning" size="default" :icon="Edit" @click="update" />
    <HintButton title="删除" type="danger" size="large " :icon="Delete" @click="del" />

  </div>
</template>
<script lang="ts">
export default {
  name: 'AttrsListenersTest'
}
</script>
<script lang="ts" setup>
import {Plus,Edit,Delete} from '@element-plus/icons-vue'
import HintButton from './HintButton.vue'
const add=()=>{
  console.log('增加')
}
const update=()=>{
  console.log('修改')
}
const del=()=>{
  console.log('删除')
}
</script>
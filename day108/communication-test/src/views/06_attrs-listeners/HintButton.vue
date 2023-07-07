<template>
  <el-tooltip  effect="dark" :content="title" placement="top-start">
    <el-button v-bind="$attrs">按钮</el-button>
  </el-tooltip>
</template>

<script lang="ts">
export default {
  name: 'HintButton'
}
</script>
<script lang="ts" setup>
import {useAttrs} from 'vue'
// 使用props的方式接收传递进来的属性数据
defineProps(['title'])
// 获取没有被props接收到的数据
const attrs = useAttrs()
// 输出没有使用props接收的数据和事件
console.log(attrs)
</script>

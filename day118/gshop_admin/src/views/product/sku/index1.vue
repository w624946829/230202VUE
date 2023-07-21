<template>
    <h2>这是sku父级组件</h2>
    <Child/>
</template>
<script lang="ts">
export default {
    name: 'sku'
}
</script>
<script lang="ts" setup>
import Child from './Child.vue'

// deep 深度选择器
// scss
// :deep (选择器){样式选择器} ::v-deep 选择器{样式选择器}
// less
// /deep/ 选择器{样式属性和值} ::v-deep 选择器{样式选择器}

// deep>>>选择器{样式属性和值}
</script>
<style scoped>
</style>
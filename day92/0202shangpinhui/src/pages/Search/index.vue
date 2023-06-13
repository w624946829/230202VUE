<!--
 * @Author: 王泽昌 624946829@qq.com
 * @Date: 2023-06-13 08:28:37
 * @LastEditors: 王泽昌 624946829@qq.com
 * @LastEditTime: 2023-06-13 11:40:38
 * @FilePath: \day92\0202shangpinhui\src\pages\Search\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  
    <div>
      <TypeNav/>
        <h1>{{ $route.query }}</h1>
    </div>
</template>

<script>

export default {
    name: "Search",
};
</script>

<style lang="less" scoped>

</style>
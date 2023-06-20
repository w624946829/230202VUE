<!--
 * @Author: 王泽昌 624946829@qq.com
 * @Date: 2023-06-12 08:34:27
 * @LastEditors: 王泽昌 624946829@qq.com
 * @LastEditTime: 2023-06-12 10:29:31
 * @FilePath: \0202shangpinhui\src\App.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div>
        <Header />
      <router-view></router-view>
      <Footer v-if="!$route.meta.isHideFooter"/>
    </div>
  
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
export default {
    name:"App",
    components:{Header,Footer}
}
</script>

<style lang="less" scoped>
//    #nprogress .bar {
//       background: rgb(225, 43, 33) !important; //自定义颜色
//     }
// 这里的颜色可以在插件文件夹中修改，并且重新启动项目
</style>
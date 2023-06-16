/*
 * @Author: 王泽昌 624946829@qq.com
 * @Date: 2023-06-12 08:34:27
 * @LastEditors: 王泽昌 624946829@qq.com
 * @LastEditTime: 2023-06-16 09:59:33
 * @FilePath: \0202shangpinhui\src\main.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/store'
import TypeNav from '@/components/TypeNav'

import '@/mock'

Vue.config.productionTip = false
Vue.component('TypeNav',TypeNav)

new Vue({
    el:'#app',
    router,
    store,
    render:h =>h(App),
})
/*
 * @Author: 王泽昌 624946829@qq.com
 * @Date: 2023-06-12 08:34:27
 * @LastEditors: 王泽昌 624946829@qq.com
 * @LastEditTime: 2023-06-25 17:02:14
 * @FilePath: \0202shangpinhui\src\main.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/store'
import TypeNav from '@/components/TypeNav'
import Pagination from '@/components/Pagination'

// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';

import { Button,Loading,MessageBox,Notification,Message} from 'element-ui';

import '@/mock'

Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;

// 引入下方  两种方式引入
// Vue.component(Button.name, Button);
Vue.use(Button)

// Vue.use(ElementUI);

Vue.config.productionTip = false
Vue.component('TypeNav',TypeNav)
Vue.component('Pagination',Pagination)

new Vue({
    el:'#app',
    router,
    store,
    //事件总线处理搜索框残留
    beforeCreate(){
        Vue.prototype.$bus = this
    },
    render:h =>h(App),
})
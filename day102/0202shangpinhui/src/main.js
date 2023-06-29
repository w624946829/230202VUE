import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/store'
import TypeNav from '@/components/TypeNav'
import Pagination from '@/components/Pagination'
import VueLazyload from 'vue-lazyload'
import loadingGif from '@/assets/images/loading.gif'

import { Button,Loading,MessageBox,Notification,Message} from 'element-ui';
import '@/mock'
// 验证引入
import '@/utils/verify'
import {ValidationProvider} from 'vee-validate'


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
Vue.use(VueLazyload ,{loading:loadingGif})

// Vue.use(ElementUI);

Vue.config.productionTip = false
Vue.component('TypeNav',TypeNav)
Vue.component('Pagination',Pagination)
Vue.component('ValidationProvider',ValidationProvider)

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
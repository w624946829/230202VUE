import Vue from 'vue'
import App from './App.vue'
import "./style/index.css" // 直接引入基础样式

Vue.config.productionTip = false // 关闭vue的提示信息

new Vue({
  beforeCreate(){
    Vue.prototype.$bus = this //安装总线
  },
  render: h => h(App),
}).$mount('#app')


const a = 100

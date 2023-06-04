import Vue from 'vue'
import App from './App.vue'


Vue.config.productionTip = false // 关闭vue的提示信息

new Vue({
  //1、安装总线
  beforeCreate(){
    Vue.prototype.$bus = this
  },
  render: h => h(App),
}).$mount('#app')


const a = 100

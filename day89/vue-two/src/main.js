import Vue from 'vue'
import App from './App.vue'


Vue.config.productionTip = false // 关闭vue的提示信息

new Vue({
  render: h => h(App),

}).$mount('#app')


const a = 100

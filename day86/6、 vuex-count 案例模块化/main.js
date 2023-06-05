import Vue from 'vue'
import App from './App.vue'
import store from './store'

Vue.config.productionTip = false // 关闭vue的提示信息

new Vue({
  render: h => h(App),
  // 4. 关联store
  store
}).$mount('#app')


const a = 100

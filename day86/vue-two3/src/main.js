import Vue from 'vue'
import App from './App.vue'
import store from './store'
import "@/style/bootstrap.css"
import "@/style/index.css"

Vue.config.productionTip = false // 关闭vue的提示信息

new Vue({

  render: h => h(App),
  store
}).$mount('#app')


const a = 100

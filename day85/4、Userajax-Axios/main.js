import Vue from 'vue'
import App from './App.vue'
import './style/index.css'
import './style/bootstrap.css'

Vue.config.productionTip = false

new Vue({
  beforeCreate(){
    Vue.prototype.$bus = this //安装总线
  },
  render: h => h(App),
}).$mount('#app')

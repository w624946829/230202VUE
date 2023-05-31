// import Vue from 'vue/dist/vue';//完整版vue包
import Vue from 'vue';//node_modules\vue\dist\vue.runtime.common.js
// 阉割版;阉割了模板编译器

import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

// new Vue({
//   el: "#app",
//   components: {
//     App,
//   },
//   template:
//     `<div/>`
  
// });

import Vue from 'vue'
import App from './App.vue'
import router from '@/router'

Vue.config.productionTip = false

new Vue({
	render: h => h(App),
	beforeCreate() {
		Vue.prototype.$bus = this
	},
	router,
}).$mount('#app')

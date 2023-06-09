import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

new Vue({
	el:'#demo',
	render: h=>h(App),
	router
})
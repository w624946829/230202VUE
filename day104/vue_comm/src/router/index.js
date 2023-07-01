import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  routes:[
		{
			path: '/props',
			component: () => import('@/pages/01_props'),
		},
		{
			path: '/event',
			component: () => import('@/pages/02_custom-event'),
		},
		{
			path: '/bus',
			component: () => import('@/pages/03_event-bus'),
		},
		{
			path: '/model',
			component: () => import('@/pages/04_v-model'),
		},
		{
			path: '/sync',
			component: () => import('@/pages/05_sync'),
		},
		{
			path: '/attrs-listeners',
			component: () => import('@/pages/06_attrs-listeners'),
		},
		{
			path: '/ref-children-parent',
			component: () => import('@/pages/07_ref-children-parent'),
		},
		{
			path: '/provide-inject',
			component: () => import('@/pages/08_provide-inject'),
		},
		{
			path: '/vuex',
			component: () => import('@/pages/09_vuex'),
		},
		{
			path: '/slot',
			component: () => import('@/pages/10_slot'),
		},
	]
})
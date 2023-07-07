/*
所有路由配置的数组
*/

export default [
  

  /* --------------------------------------- */
  {
    path: '/props_pre',
    component: () => import('@/views/01_props/PropsTest.vue'),
  },
  {
    path: '/event_pre',
    component: () => import('@/views/02_custom-event/EventTest.vue'),
  },
  {
    path: '/bus_pre',
    component: () => import('@/views/03_event-bus/EventBusTest.vue'),
  },
  {
    path: '/model_pre',
    component: () => import('@/views/04_v-model/ModelTest.vue'),
  },
  {
    path: '/sync_pre',
    component: () => import('@/views/05_sync/SyncTest.vue'),
  },
  {
    path: '/attrs-listeners_pre',
    component: () => import('@/views/06_attrs-listeners/AttrsListenersTest.vue'),
  },
  {
    path: '/ref-parent_pre',
    component: () => import('@/views/07_ref-children-parent/RefChildrenParentTest.vue'),
  },
  {
    path: '/provide-inject_pre',
    component: () => import('@/views/08_provide-inject/ProvideInjectTest.vue'),
  },
  {
    path: '/vuex_pre',
    component: () => import('@/views/09_vuex/VuexTest.vue'),
  },
   {
    path: '/slot_pre',
    component: () => import('@/views/10_slot/SlotTest.vue'),
  },
]

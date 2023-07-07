// 引入路由数组的类型
import type { RouteRecordRaw } from 'vue-router'
// 引入News组件
import News from '../pages/News.vue'
// 引入Message组件
import Message from '../pages/Message.vue'
// 引入Detail组件
import Detail from '../pages/MessageDetail.vue'
// 定义路由数组
const routes: RouteRecordRaw[] = [
  // Home路由
  {
    path: '/home',
    component: () => import('../pages/Home.vue')
  },
  // About路由
  {
    path: '/about',
    component: () => import('../pages/About.vue'),
    children: [
      { path: '/about/news', component: News },
      {
        path: '/about/message', component: Message,
        children: [
          {
            name:'detail',
            path: '/about/message/detail/:id',
            component: Detail,
            props: (route) => ({id:route.params.id})
          }
        ]
      },
      { path: '', redirect: '/about/news' }
    ]
  },
  // 重定向
  {
    path: '/',
    redirect: '/home'
  }
]
export default routes
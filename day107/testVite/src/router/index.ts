// 引入创建路由的api方法
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import routes from './routes'
// 创建路由器对象
const router = createRouter({
  // history: createWebHashHistory(), // 模式h5模式,hash模式
  history: createWebHistory(), // 模式h5模式,hash模式
  routes, // 路由数组
  scrollBehavior() {  // 设置滚动行为
    return {
      left: 0,
      top:0
    }
  },
  // 自定义的方式设置路由链接选中的类样式的名字
  linkActiveClass:'my-router-link'
})

export default router
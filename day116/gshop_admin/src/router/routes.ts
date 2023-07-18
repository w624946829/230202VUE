import type { RouteRecordRaw } from 'vue-router';
/**
 * 路由meta对象参数说明
 * meta: {
 *      title:          菜单栏及 tagsView 栏、菜单搜索名称（国际化）
 *      hidden：        是否隐藏此路由
 *      icon：          菜单、tagsView 图标，阿里：加 `iconfont xxx`，fontawesome：加 `fa xxx`
 * }
 */

/**
 * 静态路由（默认路由）
 */
 export const staticRoutes: Array<RouteRecordRaw> = [
	{
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      hidden: true
    }
  },

  {
    path: '/404',
    name: '404',
    component: () => import('@/views/error/404.vue'),
    meta: {
      hidden: true
    }
  },

  {
    path: '/',
    component: () => import('@/layout/index.vue'),
    redirect: '/home',
    children: [{
      path: 'home',
      name: 'Home',
      component: () => import('@/views/home/index.vue'),
      meta: { 
        title: '首页', 
        icon: 'ele-HomeFilled', 
      }
    }]
  },
  // 商品管理
  {
    path: '/product',
    name:'Product',
    component: () => import('@/layout/index.vue'),
    redirect: '/product/category/list',
    meta:{title:'商品管理',icon:'ele-ShoppingBag'},
    children: [
      // 分类管理
      {
      path: '/product/category/list',
      name: 'Category',
      component: () => import('@/views/product/category/index.vue'),
      meta: { 
        title: '分类管理', 
      }
    },

    // 品牌管理
    {
      path: '/product/trademark/list',
      name: 'Trademark',
      component: () => import('@/views/product/trademark/index.vue'),
      meta: { 
        title: '品牌管理', 
      }
    },
    // 平台属性管理
    {
      path: '/product/attr/list',
      name: 'Attr',
      component: () => import('@/views/product/attr/index.vue'),
      meta: { 
        title: '平台属性管理', 
      }
    },
    // spu管理
    {
      path: '/product/spu/list',
      name: 'Spu',
      component: () => import('@/views/product/spu/index.vue'),
      meta: { 
        title: 'SPU管理', 
      }
    },
    // sku管理
    {
      path: '/product/sku/list',
      name: 'Sku',
      component: () => import('@/views/product/sku/index2.vue'),
      meta: { 
        title: 'SKU管理', 
      }
    },

  ]
  },
    // 权限管理路由
    {
      name: 'Acl',
      path: '/acl',
      component: () => import('@/layout/index.vue'),
      redirect: '/acl/user/list',
      meta: { title: '权限管理', icon: 'ele-Setting' },
      children: [
        {
          name: 'User',
          path: '/acl/user/list',
          component: () => import('@/views/acl/user/index.vue'),
          meta: { title: '用户管理' }
        },
        {
          name: 'Role',
          path: '/acl/role/list',
          component: () => import('@/views/acl/role/index.vue'),
          meta: {
            title: '角色管理',
          },
        },
        {
          name: 'RoleAuth',
          path: '/acl/role/auth',
          component: () => import('@/views/acl/role/roleAuth.vue'),
          meta: {
            title: '角色管理',
            hidden: true,
            activeMenu: '/acl/role/list',
          },
        },
        {
          name: 'Permission',
          path: '/acl/permission/list',
          component: () => import('@/views/acl/permission/index.vue'),
          meta: {
            title: '菜单管理',
          }
        }
      ]
    },
 
  /* 匹配任意的路由 必须最后注册 */
  { 
    path: '/:pathMatch(.*)', 
    name: 'Any',
    redirect: '/404', 
    meta: {
      hidden: true 
    }
  }
];


/**
 * 定义动态路由
 */
export const allAsyncRoutes: Array<RouteRecordRaw> = [];

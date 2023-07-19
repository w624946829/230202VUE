import { defineStore } from 'pinia';
import { getToken, removeToken, setToken } from '../utils/token-utils';
import type { UserInfoState } from './interface';
import {ElMessage} from 'element-plus'

// 引入登录和退出和获取用户信息的api接口函数
import { loginApi,logoutApi,getUserInfoApi } from '@/api/acl/login';
// 引入静态路由，异步路由，任意路由
import { staticRoutes,asyncAllRoutes,anyRoutes } from '@/router/routes'
// 引入路由
import router from '@/router'
import type { RouteRecordRaw } from 'vue-router'
// 引入深拷贝--解决bug
import cloneDeep from 'lodash/cloneDeep'

// 路由过滤的方法
function filterRoutes(asyncRoutes:RouteRecordRaw[],routeNames:string[]){
  return asyncRoutes.filter((route)=>{
    // 判断路由对象的名字在不在路由名字标识数组中
    if(routeNames.indexOf(route.name as string) === -1)return false
    // 判断route路由对象中是否有children，是否有子路由
    if(route.children && route.children.length){
      route.children = filterRoutes(route.children,routeNames)
    }
    return true

  })
}

// 注册路由
function addRoutes(routes:RouteRecordRaw[]){
  // 调用api的方式注册路由
  routes.forEach(route=>{
    router.addRoute(route)
  })
}
/**
 * 用户信息
 * @methods setUserInfos 设置用户信息
 */
export const useUserInfoStore = defineStore('userInfo', {

	state: (): UserInfoState => ({
    token: getToken() as string,
    name: '',
    avatar: '',
    roles: [],//角色名字标识数组数据
    authBtnList: [],//按钮权限标识数组数据
    menuRoutes: [],

  }),

	actions: {
    // 登录
    async login (username: string, password: string) {
      // 调用接口
      const result = await loginApi(username,password)
      // 获取token信息并且存储起来
      this.token = result.token 
      // 缓存一次token
      setToken(result.token)
    },
    // 获取用户信息
    async getInfo () {
      // 调用获取用户信息的api接口函数
      const result = await getUserInfoApi()
      // 解构出名字，头像
      const { name,avatar,buttons,roles,routes} = result
      this.name = name //存储昵称
      this.avatar = avatar //存储头像
      this.roles = roles //存储角色名字标识数组数据
      this.authBtnList = buttons //保存按钮数据
      // this.menuRoutes = staticRoutes //路由信息
      // asyncAllRoutes routes  staticRoutes
      // 进行路由过滤，实现路由进行，需要进行对比
      this.setRoutes(routes)

    },
    // 进行路由的过滤，实现路由鉴权，内部要进行路由的对比
    setRoutes(routeNames:string[]){
      // 进行路由过滤（内部要遍历每个路由对象，判断路由对象的名字是否在路由名字标识的数组中）
      const asyncRoutes = filterRoutes(asyncAllRoutes,routeNames)
      // 进行路由的注册
      addRoutes([...asyncRoutes,anyRoutes])
      // 将有权限的路由保存到仓库中
      this.menuRoutes = asyncRoutes
    },
    // 退出
    async reset () {
      if(this.name){
        await logoutApi()
      }
      removeToken()
      // 提交重置用户信息的mutations
      this.token = ''
      this.name=""
      this.avatar = ""
    },
	},
});

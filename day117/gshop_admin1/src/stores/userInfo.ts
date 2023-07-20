// 引入定义仓库的函数
import { defineStore } from "pinia";
// 引入获取/移除/存储的token的函数
import { getToken, removeToken, setToken } from "../utils/token-utils";
// 引入用户信息的数据类型
import type { UserInfoState } from "./interface";
// 引入element-plus的消息提示
import { ElMessage } from "element-plus";
// 引入静态路由
import { staticRoutes, allAsyncRoutes, anyRoutes } from "@/router/routes";
// 引入路由器对象
import router from "@/router";
import type { RouteRecordRaw } from "vue-router";
// 引入深拷贝的方法
import cloneDeep from "lodash/cloneDeep";
// 引入登录和退出和获取用户信息的api接口函数
import { loginApi, logoutApi, getUserInfoApi } from "@/api/acl/login";

// 路由过滤的方法
function filterRoutes(asyncRoutes:RouteRecordRaw[],routeNames:string[]){
    //asyncRoutes 路由数组（前端全部的路由）  路由名形成的数组（前端的路由的一部分或者全部）  将你有权限的异步路由过滤出来
  //=》routes(未登录，只有login)  addroute(路由对象)routes根据routeNames补全路由信息
  return asyncRoutes.filter((route)=>{
    // 判断路由对象的名字在不在路由名字标识数组中
    // routeNames --- ['Product,'Attr','Spu']
    // route --- 路由对象{path:'',component:xx组件,name:'Product',children:[{path,component,name}]}
    if(routeNames.indexOf(route.name as string)=== -1 ) return false
    // 判断route路由对象中是否children，是否有子路由
    if(route.children &&route.children.length){
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
// 重置路由
function resetRoutes(){
  // 获取所有的路由对象
  const routes = router.getRoutes()
  // 移除路由器中的每个路由对象
  routes.forEach(route =>{
    // 判断是否存在
    if(route.name){
      router.removeRoute(route.name)
    }
  })
  // 静态路由还要保留
  staticRoutes.forEach(r => router.addRoute(r))
}
/**
 * 用户信息
 * @methods setUserInfos 设置用户信息
 */
export const useUserInfoStore = defineStore("userInfo", {
  // 状态数据
  state: (): UserInfoState => ({
    token: getToken() as string,// token
    name: "",// 用户名字
    avatar: "", // 头像
    menuRoutes: [],// 路由信息
    roles: [], // 角色名字标识数组数据
    authBtnList: [], // 按钮名字标识数组数据

  }),

  actions: {
    //登录
    async login(username: string, password: string) {
      // 调用接口
      const result = await loginApi(username, password);
      //获取token信息并且存储起来
      this.token = result.token;
      // 缓存一次token
      setToken(this.token);
    },

    // 获取用户信息
    async getInfo() {
      // 调用接口
      const result = await getUserInfoApi();
      // 解构出名字，头像，角色名字标识数组数据，按钮名字标识数组数据，路由名字标识数组
      const { name, avatar,roles,buttons,routes } = result;
      // 存储昵称
      this.name = name;
      // 存储头像
      this.avatar = avatar;
      // 保存角色数据
      this.roles = roles;
      // 保存按钮数据
      this.authBtnList = buttons;
      // 路由信息
      // this.menuRoutes = staticRoutes;
      // asyncAllRoutes routes staticRoutes
      // 进行路由过滤，实现路由进行，需要进行对比
      this.setRoutes(routes)
    },
    //进行路由过滤，实现路由健全，内部要进行路由的对比 
    setRoutes(routeNames:string[]){
      // 1.根据routeNames过滤出有权限的路由
      // 进行路由的过滤（内部要遍历每个路由对象，判断路由对象的名字是否在路由名字标识的数组中）
      const asyncRoutes = filterRoutes(allAsyncRoutes,routeNames)
      // 2.将有权限的路由添加到路由器中
      addRoutes([...asyncRoutes,anyRoutes])
      // 3.将有权限的路由保存到仓库中
      this.menuRoutes = [...staticRoutes,...asyncRoutes]
    },
    // 退出
    async reset() {
      if (this.name) {
        await logoutApi();
      }
      resetRoutes();//重置路由
      // 删除local中保存的token
      removeToken();
      // 提交重置用户信息的mutations
      this.token = "";
      this.name = "";
      this.avatar = "";
      
    },
    
  },
});

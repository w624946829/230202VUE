import type { RouteRecordRaw } from "vue-router";

// 用户信息包括权限数据
export interface UserInfoState {
  token: string;// token
	avatar: string;// 头像
	name: string;// 用户名字
  roles: string[];// 角色名字标识数组数据
  authBtnList: string[];// 按钮名字标识数组数据
  // routes:string[];// 路由名字标识数组数据
  menuRoutes: RouteRecordRaw[] // 用于生成导航菜单的路由列表
}





import type { RouteRecordRaw } from "vue-router";

// 用户信息包括权限数据
export interface UserInfoState {
  token: string;
	avatar: string;
	name: string;
  roles: string[];//角色名字标识数组数据
  authBtnList: string[];//按钮权限标识数组数据
  menuRoutes: RouteRecordRaw[] // 用于生成导航菜单的路由列表
}





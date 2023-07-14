import { defineStore } from 'pinia';
import { getToken, removeToken, setToken } from '../utils/token-utils';
import type { UserInfoState } from './interface';
import {ElMessage} from 'element-plus'
import {staticRoutes} from '@/router/routes'
// 引入登录和退出和获取用户信息的api接口函数
import { loginApi,logoutApi,getUserInfoApi } from '@/api/acl/login';


/**
 * 用户信息
 * @methods setUserInfos 设置用户信息
 */
export const useUserInfoStore = defineStore('userInfo', {

	state: (): UserInfoState => ({
    token: getToken() as string,
    name: '',
    avatar: '',
    menuRoutes: []
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
      const result = await getUserInfoApi()
      const { name,avatar,routes} = result
      this.name = name //存储昵称
      this.avatar = avatar //存储头像
      this.menuRoutes = staticRoutes //路由信息

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

import { defineStore } from 'pinia';
import { getToken, removeToken, setToken } from '../utils/token-utils';
import type { UserInfoState } from './interface';
import {ElMessage} from 'element-plus'
import {staticRoutes} from '@/router/routes'
// 引入登录和退出和获取用户信息的api接口函数
import {loginApi,logoutApi,getUserInfoApi} from '@/api/acl/login'

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
    async login (username: string, password: string) {
      const result = await loginApi(username,password)
      this.token = result.token 
      setToken(result.token)
    },

    async getInfo () {
      const result = await getUserInfoApi()
      const {name,avatar,routes} = result
      this.name = name
      this.avatar =avatar
      this.menuRoutes = staticRoutes
    },

    async reset () {
      if(this.name){
        await logoutApi()
      }
    },
	},
});

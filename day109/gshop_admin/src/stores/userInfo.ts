// 引入定义仓库的函数
import { defineStore } from 'pinia';
// 引入获取/移除/存储的token的函数
import { getToken, removeToken, setToken } from '../utils/token-utils';
// 引入用户信息的数据类型
import type { UserInfoState } from './interface';
// 引入element-plus的消息提示
import {ElMessage} from 'element-plus'
// 引入静态路由
import {staticRoutes} from '@/router/routes'
// 引入登录和退出和获取用户信息的api接口函数
import {loginApi,logoutApi,getUserInfoApi} from '@/api/acl/login'
import { stat } from 'fs';

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
    //登录
    async login (username: string, password: string) {
      // 调用接口
      const result = await loginApi(username, password)
      //获取token信息并且存储起来
      this.token = result.token 
      // 缓存一次token
      setToken(this.token)
    },
   
    async getInfo () {
      const result = await getUserInfoApi()
      const {name,avatar,routes} = result
      // 存储昵称
      this.name = name
      // 存储头像
      this.avatar = avatar
      // 路由信息
      this.menuRoutes = staticRoutes
    },

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

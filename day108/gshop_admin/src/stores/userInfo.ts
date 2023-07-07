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
import {loginApi,} from '@/api/acl/login'

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
      const result = await loginApi(username, password)
      //获取token信息并且存储起来
      this.token = result.token 
      // 缓存一次token
      setToken(this.token)
    },

    getInfo () {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          this.name = 'admin'
          this.avatar = 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'
          this.menuRoutes = staticRoutes
          resolve({name: this.name, avatar: this.avatar, token: this.token})
        }, 1000)
      })
    },

    reset () {
      // 删除local中保存的token
      removeToken()
      // 提交重置用户信息的mutation
      this.token = ''
      this.name = ''
      this.avatar = ''
    },
	},
});

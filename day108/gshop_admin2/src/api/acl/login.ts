//引入request（axios）
import request from '@/utils/request'
// 引入登录相关的用户信息的数据类型
import { LoginResponseModel,UserInfoResponseModel }  from './loginModel/loginModel'
// 定义枚举类型的接口地址
enum Api {
    login = '/admin/acl/index/login',
    logout = '/admin/acl/index/logout',
    getUserInfo = '/admin/acl/index/info',
}
// 定义接口函数

export const loginApi = (username:string,password:string)=>{
    return request.post<any,LoginResponseModel>(Api.login,{username,password})
}
export const logoutApi = () =>request.post<any,any>(Api.logout)

export const  getUserInfoApi = () => request.get<any,UserInfoResponseModel>(Api.getUserInfo)
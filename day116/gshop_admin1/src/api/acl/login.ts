//引入request（axios）
import request from '@/utils/request'
// 引入登录相关的用户信息的数据类型
import { LoginResponseModel,UserInfoResponseModel } from './Model/loginModel'
// 定义枚举类型的接口地址
enum Api {
    //登出的接口地址
    login = '/admin/acl/index/login',
    // 退出的接口地址
    logout = '/admin/acl/index/logout',
    // 获取用户信息接口地址
    getUserInfo = '/admin/acl/index/info',
}
// 定义接口函数
export const loginApi =(username:string,password:string)=>{
    return request.post<any,LoginResponseModel>(Api.login,{username,password})
}

export const logoutApi = ()=>{
    return request.post <any,any>(Api.logout)
} 

/**
 * 获取用户信息的接口函数
 * @returns  return 返回的是用户的信息对象数据
 */
export const getUserInfoApi = ()=> request.get<any,UserInfoResponseModel>(Api.getUserInfo)



// POST /admin/acl/index/login
// login

// POST /admin/acl/index/logout
// logout

// GET /admin/acl/index/info
// info
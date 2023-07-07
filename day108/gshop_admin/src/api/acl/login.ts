// 引入request（axios)
import request from '@/utils/request'
// 引入登录相关的用户信息的数据类型
import { LoginResponseModel,UserInfoResponseModel } from './loginModel/loginModel'

// 定义枚举类型的接口地址
enum Api{
    // 获取用户信息接口地址 POST 
    login = '/admin/acl/index/login',
    // 登录的接口地址POST 
    logout = '/admin/acl/index/logout',
    // 退出的接口地址 GET 
    getUserInfo = '/admin/acl/index/info',

}

/**
 * 登录的接口函数
 * @param username 用户的名字
 * @param password 密码
 * @returns 
 */
export const losinApi = (username:string,password:string) =>{
    return request.post <any,LoginResponseModel>(Api.login,{username,password})
}

/**
 * 退出的接口函数
 * @returns 
 */
export const logoutApi = () =>{
    return request.get <any,any>(Api.logout)
}

/**
 * 获取用户信息的接口函数
 * @returns  用户信息的数据类型
 */
export const getUserInfoApi = () =>{
    return request.get <any,UserInfoResponseModel>(Api.getUserInfo)
}





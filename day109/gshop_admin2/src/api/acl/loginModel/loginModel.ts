// 定义登录成功后返回数据的类型
export interface LoginResponseModel {
    token : string //token 标识
}

// 获取用户信息的相关的数据类型
export interface UserInfoResponseModel {
    name:string
    avatar : string
    buttons : string[]
    roles : string[]
    routes: string[]
}
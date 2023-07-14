// 定义登陆成功后返回数据的类型
export interface LoginResponseModel {
    token:string // token标识
}
// 获取用户信息的相关的数据类型
export interface UserInfoResponseModel {
    name:string //用户的名字（昵称）
    avatar:string //头像的地址
    buttons:string[] //按钮名字标识数组
    roles:string[] //角色名字标识数组
    routes:string[] //路由名字标识数组
}
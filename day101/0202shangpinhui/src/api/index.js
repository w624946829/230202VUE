/*
 * @Author: 王泽昌 624946829@qq.com
 * @Date: 2023-06-13 08:28:37
 * @LastEditors: 王泽昌 624946829@qq.com
 * @LastEditTime: 2023-06-27 11:09:50
 * @FilePath: \day92\0202shangpinhui\src\api\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/*
    该文件主要对项目中的所有请求接口，进行统一管理，方便以后的升级和维护

*/ 
import ajax from './ajax'
import mockAjax from './mockAjax'

//首页三级分类
export const reqCategoryList =  ()=>ajax.get('/product/getBaseCategoryList')

//首页轮播图数据
export const reqSlideList =  ()=>mockAjax.get('/slide')


// 首页楼层数据
export const reqFloorList =  ()=>mockAjax.get('/floor')

//搜索
export const reqSearchInfo =  (params)=>ajax.post('/list',params)


// 用于请求商品详情
export const reqGoodsInfo =  (id)=>ajax.get(`/item/${id}`)

// 添加商品到购物车‘’‘购物车数量变更
export const reqAddToCart =  (id,num)=>ajax.post(`/cart/addToCart/${id}/${num}`)

// 请求购物车数据
export const reqCartList =  ()=>ajax.get(`/cart/cartList`)

// 切换购物车中商品的选中状态
export const reqCheckOne =  (id,isChecked)=>ajax.get(`/cart/checkCart/${id}/${isChecked}`)


// 获取购物车列表
export const reqCheckAll =  (skuIdList ,flag)=>ajax.post(`/cart/batchCheckCart/${flag}`,skuIdList)


// 请求删除购物车商品
export const reqDeleteOne =  (id)=>ajax.delete(`/cart/deleteCart/${id}`)

// 请求删除购物车中多个商品
export const reqBatchDelete =  (idList)=>ajax.post('/cart/batchDeleteCart',idList)
 

//修改商品的数量
export const changeSkuNum =  (id,num)=>ajax.post(`/cart/updateCartNum/${id}/${num}`)

// 请求获取验证码
export const reqGetCode =  (phone)=>ajax.get(`/user/passport/sendCode/${phone}`)

// 注册请求
/**
 * 
 * @param params {Object} {注册时的参数对象} phone:手机号,password:密码,code:验证码
 * @returns 
 */
export const reqRegister = (params) => ajax.post('/user/passport/register',params)

// 请求注册
/**
 * 
 * @param params {Object} {登录时的参数对象} phone:手机号,password:密码
 * @returns 
 */
export const reqLogin = (params) => ajax.post('/user/passport/login',params)


// 根据token获取用户信息
export const reqUserInfo = () => ajax.get('/user/passport/auth/getUserInfo')

// 请求退出登录
export const reqQuit = () => ajax.get('/user/passport/logout')


// 获取当前用户的交易信息
export const reqTradeInfo = () => ajax.get('/order/auth/trade')

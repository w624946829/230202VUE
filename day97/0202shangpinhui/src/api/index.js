/*
 * @Author: 王泽昌 624946829@qq.com
 * @Date: 2023-06-13 08:28:37
 * @LastEditors: 王泽昌 624946829@qq.com
 * @LastEditTime: 2023-06-20 23:23:32
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

// 添加商品到购物车
export const reqAddToCart =  (id,num)=>ajax.post(`/cart/addToCart/${id}/${num}`)
  
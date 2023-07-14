// 用来定义接口函数

// 引入request
import request from '@/utils/request'
// 引入品牌相关的数据类型
import { TrademarkListModel,TrademarkModel,TrademarkPageModel } from './model/trademarkModel'
// 通过枚举的方式来定义接口地址的数据类型
enum Api{
    //根据关键词查找品牌对象形成的数组数据
    getTrademarkListByKeyword = '/admin/product/baseTrademark/findBaseTrademarkByKeyword',
    // 根据id查找某个品牌对象数据
    getTrademarkById = '/admin/product/baseTrademark/get',
    // 获取所有的品牌对象形成的数组数据
    getTrademarkListAll = '/admin/product/baseTrademark/getTrademarkList',
    // 获取id数组获取品牌对象形成的数组数据
    getTrademarkListByIds = '/admin/product/baseTrademark/inner/findBaseTrademarkByTrademarkIdList',
    // 根据id移除某个品牌对象数据
    deleteTrademarkById = '/admin/product/baseTrademark/remove',
    // 根据页码和每页的条数获取品牌对象形成的数组数据
    getTrademarkList = '/admin/product/baseTrademark',
    // 添加品牌
    addTrademark = '/admin/product/baseTrademark/save',
    // 更新品牌
    updateTrademark = '/admin/product/baseTrademark/update'
}

// 根据关键词查找对应的品牌对象列表数组数据
export const getTrademarkByKeywordApi = (keyword:string)=>request.get<any,TrademarkListModel>(Api.getTrademarkListByKeyword+`/${keyword}`)
// 根据id查找对应的品牌对象数据
export const getTrademarkByIdApi = (id:number)=>request.get<any,TrademarkModel>(Api.getTrademarkById + `/${id}`)
// 获取所有的品牌对象形成的数组数据
export const getTrademarkListAllApi = ()=>request.get<any,TrademarkListModel>(Api.getTrademarkListAll)
// 根据品牌的id数组获取对应的品牌对象形成的数组数数据
export const getTrademarkListByIdsApi = (ids:number[]) =>request.post<any,TrademarkListModel>(Api.getTrademarkListByIds,ids)
// 根据id删除某个品牌对象数据
export const deleteTrademarkByIdApi = (id:number) => request.delete<any,null>(Api.deleteTrademarkById + `/${id}`)
// 根据页码和每页的条数获取品牌对象形成的数组数据
export const getTrademarkListApi = (page:number,limit:number)=>request.get<any,TrademarkPageModel>(Api.getTrademarkList + `/${page}/${limit}`)
// 新增品牌
export const addTrademarkApi = (trademark:TrademarkModel) => request.post<any,null>(Api.addTrademark,trademark)
// 修改品牌
export const updateTrademarkApi = (trademark:TrademarkModel) => request.put<any,null>(Api.updateTrademark,trademark)
// 添加或者修改品牌操作
export const addOrUpdateTrademarkApi = (trademark:TrademarkModel)=>{
    if(trademark.id){
        return request.put<any,null>(Api.updateTrademark,trademark)
    }else{
        return request.post<any,null>(Api.addTrademark,trademark)
    }
}
// 判断id的值是否存在



// GET /admin/product/baseTrademark/findBaseTrademarkByKeyword/{keyword}
// findBaseTrademarkByKeyword

// GET /admin/product/baseTrademark/get/{id}
// 获取BaseTrademark

// GET /admin/product/baseTrademark/getTrademarkList
// getTrademarkList

// POST /admin/product/baseTrademark/inner/findBaseTrademarkByTrademarkIdList
// findBaseTrademarkByTrademarkIdList

// DELETE /admin/product/baseTrademark/remove/{id}
// 删除BaseTrademark

// GET /admin/product/baseTrademark/{page}/{limit}
// 分页列表

// POST /admin/product/baseTrademark/save
// 新增BaseTrademark

// PUT /admin/product/baseTrademark/update
// 修改BaseTrademark




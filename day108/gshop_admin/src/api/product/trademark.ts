// 用来定义接口函数

// 引入request
import request from '@/utils/request'
// 引入品牌相关的数据类型
import { TrademarkListModel,TrademarkModel,TrademarkPageModel } from './model/trademarkModel'

//通过枚举的方式定义接口地址的类型
enum Api{
    // 根据关键字查找品牌对象形成的数组数据
    getTrademarkListByKeyword = "/admin/product/baseTrademark/findBaseTrademarkByKeyword",
    // 根据id查找某个品牌对象数据
    getTrademarkById = '/admin/product/baseTrademark/get/',
    // 根据所有的品牌对象形成的数组数据
    getTrademarkList1 = '/admin/product/baseTrademark/getTrademarkList',
    // 根据id数组获取品牌对象形成的数组数据
    getTrademarkListByIds = '/admin/product/baseTrademark/inner/findBaseTrademarkByTrademarkIdList',
    // 根据id移除某个品牌对象数据
    removeTrademarkById = '/admin/product/baseTrademark/remove/',
    // 根据页码和每页的条数获取品牌形成的数组数据
    getTrademarkList = "/admin/product/baseTrademark",
    // 添加品牌
    addTrademark = '/admin/product/baseTrademark/save',
    // 更新品牌
    updateTrademark = '/admin/product/baseTrademark/update'

}



// /admin/product/baseTrademark/findBaseTrademarkByKeyword/{keyword}
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

// POST /admin/product/baseTrademark/save
// 新增BaseTrademark

// PUT /admin/product/baseTrademark/update
// 修改BaseTrademark


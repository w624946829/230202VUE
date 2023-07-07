import request from '@/utils/request';
import { TrademarkListModel,TrademarkModel,TrademarkPageModel } from '../trademark';

enum Api { 
    getTrademarkListByKeyword = '/admin/product/baseTrademark/findBaseTrademarkByKeyword',
    getTrademarkById = '/admin/product/baseTrademark/get',
    getTrademarkList1 = '/admin/product/baseTrademark/getTrademarkList',
    getTrademarkListByIds = '/admin/product/baseTrademark/inner/findBaseTrademarkByTrademarkIdList',
    removeTrademarkById = '/admin/product/baseTrademark/remove',
    getTrademarkList = "/admin/product/baseTrademark",
    addTrademark = '/admin/product/baseTrademark/save',
    updateTrademark = '/admin/product/baseTrademark/update'
 }











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
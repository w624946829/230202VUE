// 用来定义接口函数

// 引入request
import request from "@/utils/request";
// 引入品牌相关的数据类型
import {
  TrademarkListModel,
  TrademarkModel,
  TrademarkPageModel,
} from "./model/trademarkModel";

//通过枚举的方式定义接口地址的类型
enum Api {
  // 根据关键字查找品牌对象形成的数组数据
  getTrademarkListByKeyword = "/admin/product/baseTrademark/findBaseTrademarkByKeyword",
  // 根据id查找某个品牌对象数据
  getTrademarkById = "/admin/product/baseTrademark/get/",
  // 根据所有的品牌对象形成的数组数据
  getTrademarkList1 = "/admin/product/baseTrademark/getTrademarkList",
  // 根据id数组获取品牌对象形成的数组数据
  getTrademarkListByIds = "/admin/product/baseTrademark/inner/findBaseTrademarkByTrademarkIdList",
  // 根据id移除某个品牌对象数据
  removeTrademarkById = "/admin/product/baseTrademark/remove/",
  // 根据页码和每页的条数获取品牌形成的数组数据
  getTrademarkList = "/admin/product/baseTrademark",
  // 添加品牌
  addTrademark = "/admin/product/baseTrademark/save",
  // 更新品牌
  updateTrademark = "/admin/product/baseTrademark/update",
}
//根据关键字查找对应的品牌对象列表数组数据
export const getTrademarkListByKeyword = (keyword: string) =>
  request.get<any, TrademarkListModel>(
    Api.getTrademarkListByKeyword + `/${keyword}`
  );

//根据id查找对应的品牌对象数据
export const getTrademarkByIdApi = (id: number) =>
  request.get<any, TrademarkModel>(Api.getTrademarkById + `${id}`);

//获取所有的品牌对象形成的数组数据
export const getTrademarkListAllApi = () =>
  request.get<any, TrademarkListModel>(Api.getTrademarkList1);

//根据品牌的id数组获取对应的品牌对象形成的数组数据
export const getTrademarkListByIdsApi = (ids: number[]) =>
  request.post<any, TrademarkListModel>(Api.getTrademarkListByIds, ids);

// 根据id删除某个品牌对象数据
export const deleteTrademarkByIdApi = (id: number) =>
  request.delete<any, null>(Api.removeTrademarkById + `/${id}`);

// 根据页码和每页的条数获取品牌对象形成的数组数据
export const getTrademarkListApi = (page: number, limit: number) =>
  request.get<any, TrademarkPageModel>(
    Api.getTrademarkList + `/${page}/${limit}`
  );

//新增品牌
export const addTrademarkaApi = (trademark: TrademarkModel) =>
  request.post<any, null>(Api.addTrademark, trademark);

// 修改品牌
export const updateTrademarkApi = (trademark: TrademarkModel) =>
  request.put<any, null>(Api.updateTrademark, trademark);

export const addOrUpdateTrademarkApi = (trademark: TrademarkModel) => {
  // 判断id的值是否存在
  if (trademark.id) {
    //修改
    return request.put<any, null>(Api.updateTrademark, trademark) 
  } else {
    //添加操作
    return request.post<any, null>(Api.addTrademark, trademark)
  }
};

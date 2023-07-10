// 用来定义接口函数

// 引入request
import request from "@/utils/request";
// 引入类型相关的数据类型
import {CategoryModel,CategoryListModel,CategoryIdModel} from "./model/categoryModel";

//通过枚举的方式定义接口地址的类型
enum Api {
  getCategory1List = "/admin/product/getCategory1",
  getCategory2List = "/admin/product/getCategory2",
  getCategory3List = "/admin/product/getCategory3",
  getAttrInfoList = "/admin/product/attrInfoList",
}

// 定义接口函数
// 获取一级分类信息列表数据
export const getCategory1ListApi = () =>request.get<any,CategoryListModel>(Api.getCategory1List);
// 获取二级分类信息列表数据
export const getCategory2ListApi = (category1Id:number) =>request.get<any,CategoryListModel>(Api.getCategory2List+`/${category1Id}`);
// 获取三级分类信息列表数据
export const getCategory3ListApi = (category2Id:number) =>request.get<any,CategoryListModel>(Api.getCategory3List+`/${category2Id}`);
// 获取商品平台属性列表数据
export const getAttrInfoListApi = (categoryIdModel:CategoryIdModel) =>request.get<any,CategoryListModel>(Api.getAttrInfoList+`/${categoryIdModel.category1Id}/${categoryIdModel.category2Id}/${categoryIdModel.category3Id}`);




// 引入request
import request from "@/utils/request";
// 引入品牌相关的数据类型
import {
  AttrInfoListModel,AttrInfoModel,AttrValueListModel,AttrValueModel
} from "./model/attrModel";
import { CategoryListModel, CategoryIdsModel } from "./model/categoryModel";
//通过枚举的方式定义接口地址的类型
enum Api {
    getAttrInfoList = "/admin/product/attrInfoList",
    deleteAttrInfoByAttrId = "/admin/product/deleteAttr/",
    getAttrValueListByAttrId = "/admin/product/getAttrValueList/",
    addOrUpdateAttrInfo = "/admin/product/saveAttrInfo",
  }
  
  // 定义接口函数
  // 根据三个分类id获取商品平台属性对象数组数据的接口函数
  export const getAttrInfoListApi = ({category1Id,category2Id,category3Id}:CategoryIdsModel) =>request.get<any,AttrInfoListModel>(Api.getAttrInfoList+`/${category1Id}/${category2Id}/${category3Id}`);
  
//根据id删除对应的平台属性的接口函数
export const deleteAttrInfoByAttrIdApi = (attrId:number) =>request.delete<any,null>(Api.deleteAttrInfoByAttrId+`${attrId}`);

// 根据id获取平台属性值对象数组的接口函数
export const getAttrValueListByAttrIdApi = (attrId:number) =>request.get<any,AttrValueListModel>(Api.getAttrValueListByAttrId+`${attrId}`);

// 添加或者修改平台属性对象的接口函数
export const addOrUpdateAttrInfoApi = (attrInfo:AttrInfoModel) =>request.post<any,null>(Api.addOrUpdateAttrInfo,attrInfo);




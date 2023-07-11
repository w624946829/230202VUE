import request from "@/utils/request";
// 引入相关的数据类型
import { AttrInfoListModel,AttrValueListModel,AttrInfoModel } from "./model/attrModel";
import { CateogryIdsModel } from './model/categoryModel'
// 定义api接口地址
enum Api {
    getAttrInfoList = "/admin/product/attrInfoList",//获取平台属性列表
    deleteAttrInfoByAttrId = "/admin/product/deleteAttr",//删除平台属性
    getAttrValueListByAttrId = '/admin/product/getAttrValueList',//获取平台属性值列表
    addOrUpdateAttrInfo = "/admin/product/saveAttrIngo",//添加或者修改平台属性
}
// 定义接口函数
// 根据三个分类的id获取对应的平台属性对象数组数据的接口函数
export const getAttrInfoListApi = ({category1Id,category2Id,category3Id}:CateogryIdsModel)=>request.get<any,AttrInfoListModel>(Api.getAttrInfoList + `/${category1Id}/${category2Id}/${category3Id}`)

// 根据id删除对应的平台属性的接口函数
export const deleteAttrInfoByAttrIdApi = (attrId:number)=>request.delete<any,null>(Api.deleteAttrInfoByAttrId +`/${attrId}`)

// 根据id获取平台属性值对象数组的接口函数
export const getAttrValueListByAttrIdApi = (attrId:number)=>request.get<any,AttrValueListModel>(Api.getAttrValueListByAttrId + `/${attrId}`)

// 添加或者修改平台属性对象的接口函数
export const addOrUpdateAttrInfoApi = (attrInfo:AttrInfoModel)=>request.post<any,null>(Api.addOrUpdateAttrInfo,attrInfo)
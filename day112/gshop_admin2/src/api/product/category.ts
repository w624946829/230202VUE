import request from "@/utils/request";
import type { CategoryListModel } from "./model/categoryModel";

enum Api {
    getCategory1List = '/admin/product/getCategory1',//获取一级分类列表
    getCategory2List = '/admin/product/getCategory2',//获取二级分类列表
    getCategory3List = '/admin/product/getCategory3',//获取三级分类列表
}
// 定义接口函数
// 获取一级分类列表数据的接口函数
export const getCategory1ListApi = () => request.get<any,CategoryListModel>(Api.getCategory1List)
// 获取二级分类列表数据的接口函数
export const getCategory2ListApi = (category1Id:number) =>request.get<any,CategoryListModel>(Api.getCategory2List + `/${category1Id}`)
// 获取三级分类列表数据的接口函数
export const getCategory3ListApi = (category2Id:number) => request.get<any,CategoryListModel>(Api.getCategory3List + `/${category2Id}`)
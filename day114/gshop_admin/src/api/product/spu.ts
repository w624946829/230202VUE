// 引入request
import request from "@/utils/request";
// 引入类型相关的数据类型
import {BaseSaleAttrListModel,SpuImageListModel,SpuListModel,SpuModel,SpuPageListModel,SpuPageParamsModel, SpuSaleAttrListModel} from "./model/spuModel";
// 枚举定义接口地址
enum Api {
    GetBaseSaleAttrList = '/admin/product/baseSaleAttrList', // 获取基础的销售属性对象数组的地址
    DeleteSpuInfoBySpuId = '/admin/product/deleteSpu', // 根据spu的id删除spu对象的地址
    GetSpuInfoListByKeyword = '/admin/product/findSpuInfoByKeyword', // 根据关键字查找spu对象数组的接口函数
    GetSpuInfoBySpuId = '/admin/product/getSpuById', // 根据spuId的id获取spu对象的地址
    GetSpuInfoBySpuIdList = '/admin/product/inner/findSpuInfoBySpuIdList', // 根据spu的id数组获取spu对象数组的地址
    AddSpuInfo = '/admin/product/saveSpuInfo', // 添加spu对象
    UpdateSputInfo = '/admin/product/updateSpuInfo', // 更新spu对象
    GetSpuInfoList = '/admin/product', // 根据页码和每页条数的三级分类获取spu对象数组的地址
    GetSpuImageListBySpuId= '/admin/product/spuImageList',//通过spu的id标识获取spu图片对象数组的接口地址
    GetSpuSaleAttrListBySpuId = '/admin/product/spuSaleAttrList',//通过spu的id标识获取spu销售属性对象数组的接口地址
}
// 获取基础的销售属性对象数组的地址
export const getBaseSaleAttrListApi = () =>request.get<any,BaseSaleAttrListModel>(Api.GetBaseSaleAttrList);
// 根据spu的id删除spu对象的地址
export const deleteSpuInfoBySpuIdApi = (spuId:string) =>request.delete<any,null>(Api.DeleteSpuInfoBySpuId+`/${spuId}`);
// 根据关键字查找spu对象数组的接口函数
export const getSpuInfoListByKeywordApi = (keyword:string) =>request.get<any,SpuListModel>(Api.GetSpuInfoListByKeyword+`/${keyword}`);
// 根据spuId的id获取spu对象的地址
export const getSpuInfoBySpuIdApi = (spuId:number) =>request.get<any,SpuModel>(Api.GetSpuInfoBySpuId+`/${spuId}`);
// 根据spu的id数组获取spu对象数组的地址
export const getSpuInfoBySpuIdListApi = (ids:string[]) =>request.post<any,SpuListModel>(Api.GetSpuInfoBySpuIdList,ids);
// 添加spu接口函数
export const addSpuInfoApi = (spu:SpuModel) =>request.post<any,null>(Api.AddSpuInfo,spu);
// 更新spu的接口函数
export const updateSputInfoApi = (spu:SpuModel) =>request.post<any,null>(Api.UpdateSputInfo,spu);
// 根据页码和每页条数的三级分类获取spu对象数组的地址
export const getSpuInfoListApi = ({page,limit,category3Id}:SpuPageParamsModel) =>request.get<any,SpuPageListModel>(Api.GetSpuInfoList+`/${page}/${limit}`,{params:{category3Id}});
// 添加或者修改spu接口函数
export const addOrUpdateSpuInfoApi = (spu:SpuModel) => spu.id ? updateSputInfoApi(spu) : addSpuInfoApi(spu);
// 根据spu的id查找对应的图片对象数组的接口函数
export const getSpuImageListBySpuIdApi = (spuId:number)=>request.get<any,SpuImageListModel>(Api.GetSpuImageListBySpuId  + `/${spuId}`)
// 根据spu的id查找对应的销售属性对象数组的接口函数
    export const getSpuSaleAttrListBySpuIdApi = (spuId:number)=>request.get<any,SpuSaleAttrListModel>(Api.GetSpuSaleAttrListBySpuId  + `/${spuId}`)



// GET /admin/product/baseSaleAttrList
// getBaseSaleAttrList

// DELETE /admin/product/deleteSpu/{spuId}
// deleteSpu

// GET /admin/product/findSpuInfoByKeyword/{keyword}
// findSpuInfoByKeyword

// GET /admin/product/getSpuById/{spuId}
// 获取spu基本信息

// POST /admin/product/inner/findSpuInfoBySpuIdList
// findSpuInfoBySpuIdList

// POST /admin/product/saveSpuInfo
// saveSpuInfo

// POST /admin/product/updateSpuInfo
// 更改spu信息

// GET /admin/product/{page}/{limit}
// index


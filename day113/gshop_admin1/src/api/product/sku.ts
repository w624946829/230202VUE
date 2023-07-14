import request from '@/utils/request'
import { SkuImageModel, SkuListModel, SkuModel, SkuPageListModel, SkuSaleAttrValueListModel } from './model/skuModel'
// 定义枚举类型的api地址
enum Api {
    CancelSale='/admin/product/cancelSale',
    OnSale='/admin/product/onSale',
    DeleteSkuInfoById = '/admin/product/deleteSku',
    GetSkuInfoListBySpuId = '/admin/product/findBySpuId',
    GetSkuInfoBySkuId = '/admin/product/getSkuById',
    GetSkuInfoListByKeyword = '/admin/product/inner/findSkuInfoByKeyword',
    GetSkuInfoListByIds = '/admin/product/inner/findSkuInfoBySkuIdList',
    GetSkuInfoList = '/admin/product/list',
    AddSkuInfo = '/admin/product/saveSkuInfo',
    UpdateSkuInfo = '/admin/product/updateSkuInfo',
   
}
// 下架的接口函数
export const cancelSaleApi = (skuId:number)=>request.get<any,null>(Api.CancelSale+`/${skuId}`)
// 上架的接口函数
export const onSaleApi = (skuId:number) => request.get<any,null>(Api.OnSale+`/${skuId}`)
// 根据sku的id删除sku对象的接口函数
export const deleteSkuInfoByIdApi = (skuId:number) =>request.delete<any,null>(Api.DeleteSkuInfoById+`/${skuId}`)
// 根据spu的id查找对应的sku对象数组数据的接口函数
export const getSkuInfoListBySpuIdApi = (spuId:number) =>request.get<any,SkuListModel>(Api.GetSkuInfoListBySpuId+`/${spuId}`)
// 根据sku的id查找对应的sku对象的接口函数
export const getSkuInfoBySkuIdApi = (skuId:number) =>request.get<any,SkuModel>(Api.GetSkuInfoBySkuId+`/${skuId}`)
// 根据关键字找sku对象数组的接口函数
export const getSkuInfoListByKeywordApi = (keyword:string) => request.get<any,SkuListModel>(Api.GetSkuInfoListByKeyword+`/${keyword}`)
// 根据id的数组找sku独享数组的接口函数
export const getSkuInfoListByIdsApi = (ids:string[])=>request.post<any,SkuListModel>(Api.GetSkuInfoListByIds,ids)
// 分页的方式找sku对象数组数据的接口函数
export const getSkuInfoListApi = (page:number,limit:number)=>request.get<any,SkuPageListModel>(Api.GetSkuInfoList+`/${page}/${limit}`)
// 添加sku的接口函数
export const addSkuInfoApi = (skuInfo:SkuModel) => request.post<any,null>(Api.AddSkuInfo,skuInfo)
// 修改sku的接口函数
export const updateSkuInfoApi = (skuInfo:SkuModel)=>request.post<any,null>(Api.UpdateSkuInfo,skuInfo)
// 添加或修改sku的接口函数
export const addOrUpdateSkuInfoApi = (skuInfo:SkuModel) => skuInfo.id ? updateSkuInfoApi(skuInfo) : addSkuInfoApi (skuInfo)




// GET /admin/product/list/{page}/{limit}
// index



// POST /admin/product/saveSkuInfo
// saveSkuInfo

// GET /admin/product/spuImageList/{spuId}
// getSpuImageList

// GET /admin/product/spuSaleAttrList/{spuId}
// getSpuSaleAttrList

// POST /admin/product/updateSkuInfo
// updateSkuInfo


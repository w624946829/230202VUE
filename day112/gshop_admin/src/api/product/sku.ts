import request from '@/utils/request'
import { SkuListModel, SkuModel, SkuPageListModel } from './model/skuModel'
import { SkuAttrValueListModel, SkuImageListModel, SkuSaleAttrValueListModel } from './model/skuModel'

enum Api {
    CancelSale = '/admin/product/cancelSale',//下架地址
    OnSale = '/admin/product/onSale',//上架地址
    DeleteSkuInfoById = '/admin/product/deleteSku',//删除sku的id删除sku对象的接口地址
    GetSkuInfoListBySpuId = `/admin/product/findBySpuId`,//通过spu的id查找对应的sku对象数据的的接口地址
    GetSkuInfoBySkuId = '/admin/product/getSkuById',//通过sku的id标识获取sku对象的接口地址
    GetSkuInfoListByKeyword = '/admin/product/inner/findSkuInfoByKeyword',//通过关键字获取sku对象数组的接口地址'
    GetSkuInfoListByIds = '/admin/product/inner/findSkuInfoBySkuIdList',//通过sku的id标识数组获取sku对象数组的接口地址
    GetSkuInfoList = '/admin/product/list',//分页的方式找sku对象数组数据的接口地址
    AddSkuInfo = '/admin/product/saveSkuInfo',//添加sku对象的接口地址
    UpdateSkuInfo = '/admin/product/updateSkuInfo',//更新sku对象的接口地址
    GetSpuImageListBySpuId= '/admin/product/spuImageList',//通过spu的id标识获取spu图片对象数组的接口地址
    GetSpuSaleAttrListBySpuId = '/admin/product/spuSaleAttrList',//通过spu的id标识获取spu销售属性对象数组的接口地址
}
//下架的接口函数
    export const cancelSaleApi = (skuId:number)=>request.get<any,null>(Api.CancelSale  + `/${skuId}`)
// 上架的接口函数
    export const onSaleApi = (skuId:number)=>request.get<any,null>(Api.OnSale  + `/${skuId}`)
// 根据sku的id删除sku对象的接口函数
    export const deleteSkuInfoByIdApi = (skuId:number)=>request.delete<any,null>(Api.DeleteSkuInfoById  + `/${skuId}`)
// 根据spu的di查找对应的sku对象数组数据的接口函数
    export const getSkuInfoListBySpuIdApi = (spuId:number)=>request.get<any,SkuListModel>(Api.GetSkuInfoListBySpuId  + `/${spuId}`)
// 根据sku的id查找对应的sku对象的接口函数
    export const getSkuInfoBySkuIdApi = (skuId:number)=>request.get<any,SkuModel>(Api.GetSkuInfoBySkuId  + `/${skuId}`)
// 根据关键字找sku对象数组的接口函数
    export const getSkuInfoListByKeywordApi = (keyword:string)=>request.get<any,SkuListModel[]>(Api.GetSkuInfoListByKeyword  + `/${keyword}`)
// 根据id的数组找sku对象数组的接口函数
    export const getSkuInfoListByIdsApi = (ids:string[])=>request.post<any,SkuListModel[]>(Api.GetSkuInfoListByIds,ids)
// 分页的方式找sku对象数组的接口函数
    export const getSkuInfoListApi = (page:number,limit:number)=>request.get<any,SkuPageListModel>(Api.GetSkuInfoList  + `/${page}/${limit}`)
// 添加sku对象的接口函数
    export const addSkuInfoApi = (skuInfo:SkuModel)=>request.post<any,null>(Api.AddSkuInfo,skuInfo)
// 修改sku的接口函数
    export const updateSkuInfoApi = (skuInfo:SkuModel)=>request.post<any,null>(Api.UpdateSkuInfo,skuInfo)
// 添加或者修改sku的接口函数
    export const addOrUpdateSkuInfoApi = (skuInfo:SkuModel)=>skuInfo.id?updateSkuInfoApi(skuInfo):addSkuInfoApi(skuInfo)
// 根据spu的id查找对应的图片对象数组的接口函数
    export const getSpuImageListBySpuIdApi = (spuId:number)=>request.get<any,SkuImageListModel>(Api.GetSpuImageListBySpuId  + `/${spuId}`)
// 根据spu的id查找对应的销售属性对象数组的接口函数
    export const getSpuSaleAttrListBySpuIdApi = (spuId:number)=>request.get<any,SkuSaleAttrValueListModel>(Api.GetSpuSaleAttrListBySpuId  + `/${spuId}`)



// GET /admin/product/cancelSale/{skuId}
// cancelSale

// DELETE /admin/product/deleteSku/{skuId}
// deleteSku

// GET /admin/product/findBySpuId/{spuId}
// findBySpuId

// GET /admin/product/getSkuById/{skuId}
// getById

// GET /admin/product/inner/findSkuInfoByKeyword/{keyword}
// findSkuInfoByKeyword

// POST /admin/product/inner/findSkuInfoBySkuIdList
// findSkuInfoBySkuIdList

// GET /admin/product/list/{page}/{limit}
// index

// GET /admin/product/onSale/{skuId}
// onSale

// POST /admin/product/saveSkuInfo
// saveSkuInfo

// GET /admin/product/spuImageList/{spuId}
// getSpuImageList

// GET /admin/product/spuSaleAttrList/{spuId}
// getSpuSaleAttrList

// POST /admin/product/updateSkuInfo
// updateSkuInfo


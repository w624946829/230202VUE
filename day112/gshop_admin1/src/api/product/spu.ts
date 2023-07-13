import request from '@/utils/request'
import { BaseSaleAttrListModel, SpuListModel, SpuModel, SpuPageParamsModel } from './model/spuModel'

// 枚举定义接口地址
enum Api {
    GetBaseSaleAttrList = '/admin/product/baseSaleAttrList', //获取基础的销售属性对象数组的地址
    DeleteSpuInfoBySpuId = '/admin/product/deleteSpu', // 根据spu的id删除spu对象的地址
    GetSpuInfoListByKeyword = '/admin/product/findSpuInfoByKeyword/',// 根据关键字查看spu对象数组的地址
    GetSpuInfoBySpuId = '/admin/product/getSpuById/',//根据spu的id获取spu对象的地址
    GetSpuInfoBySpuIdList = '/admin/product/inner/findSpuInfoBySpuIdList',//根据spu的id数组获取spu对象数组的地址
    AddSpuInfo = '/admin/product/saveSpuInfo',//添加spu对象
    UpdateSpuInfo = '/admin/product/updateSpuInfo',//修改spu对象
    GetSpuInfoList = '/admin/product'//根据页码和每页条数和三级分类获取spu对象数组的地址
}

// 获取基础的销售属性对象数组的函数
export const getBaseSaleAttrListApi = ()=>request.get<any,BaseSaleAttrListModel>(Api.GetBaseSaleAttrList)
// 根据spu的id删除spu对象的函数
export const deleteSpuInfoBySpuIdApi = (spuId:number)=> request.delete<any,null>(Api.DeleteSpuInfoBySpuId+`/${spuId}`)
// 根据关键字查找spu对象数组的接口函数
export const getSpuInfoListByKeywordApi = (keyword:string)=> request.get<any,SpuListModel>(Api.GetSpuInfoListByKeyword + `${keyword}`)
// 根据spu的id获取spu对象的接口函数
export const getSpuInfoBySpuIdApi = (spuId:number) => request.get<any,SpuModel>(Api.GetSpuInfoBySpuId + `${spuId}`)
// 根据spu的id数组获取spu对象数组的接口函数
export const getSpuInfoBySpuIdListApi=(ids:string[])=> request.post<any,SpuListModel>(Api.GetSpuInfoBySpuIdList,ids)
// 添加spu的接口函数
export const addSpuInfoApi = (spu:SpuModel) =>request.post<any,null>(Api.UpdateSpuInfo,spu)
// 修改spu的接口函数
export const updateSpuInfoApi = (spu:SpuModel) =>request.post<any,null>(Api.UpdateSpuInfo,spu)
// 根据页码和每页条数和三级分类获取spu对象数组的接口函数
export const getSpuInfoListApi = ({page,limit,category3Id}:SpuPageParamsModel) =>request.get<any,SpuListModel>(Api.GetSpuInfoList+ `/${page}/${limit}`,{params:{category3Id}})
// 添加或者修改spu接口函数
export const addOrUpdateSpuInfo = (spu:SpuModel)=> spu.id ?updateSpuInfoApi(spu):addSpuInfoApi(spu)





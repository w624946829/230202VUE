// 引入request
import request from "@/utils/request";
// 引入类型相关的数据类型
import {BaseSaleAttrListModel,SpuListModel,SpuModel,SpuPageListModel,SpuPageParamsModel} from "./model/spuModel";
// 枚举定义接口地址
enum Api {
    // 获取基础的销售属性对象数组的地址
    GetBaseSaleAttrList = '/admin/product/baseSaleAttrList',
    // 根据spu的id删除spu对象的地址
    DeleteSpuInfoBySpuId = '/admin/product/deleteSpu',
    // 根据关键字查找spu对象数组的接口函数
    GetSpuInfoListByKeyword = '/admin/product/findSpuInfoByKeyword',
    n

}




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
import request from '@/utils/request'
import {} from './model/skuModel'
enum Api {
    CancelSale = '/admin/product/cancelSale',//下架的地址
    OnSale = '/admin/product/onSale',//上架的地址
    DeleteSkuInfoById ='/admin/product/deleteSku',//根据sku的id删除sku对象的接口地址
    GetSkuInfoListBySpuId = `/admin/product/getSkuById`,//根据spu的id查找对应的sku对象的接口地址
    GetSkuInfoBySkuId = '/admin/product/getSkuById',//根据id查找对应的sku对象的接口地址
    GetSkuInfoListByKeyword = '/admin/product/inner/findSkuInfoByKeyword',//根据关键字找sku对象数组的接口地址
    GetSkuInfoListByIds='/admin/product/inner/findSkuInfoBySkuIdList',//根据id的数组找sku对象数组的接口地址
    GetSkuInfoList = '/admin/product/list',//分页的方式找sku对戏选哪个数组数据的接口地址
    AddSkuInfo = '/admin/product/saveSkuInfo', //添加sku的接口地址
    UpdateSkuInfo = '/admin/product/updateSkuInfo',//更新sku的接口地址
    GetSpuImageBySouId = '/admin/product/spuImageList',//根据spu的id查找对应的图片对象数组的接口地址
    GetSpuSaleAttrListBySpuId = "/admin/product/spuSaleAttrList",//根据spu的id查找对应的销售属性对象数组的接口地址

}


// GET /admin/product/cancelSale/{skuId}
// cancelSale

// GET /admin/product/onSale/{skuId}
// onSale

// DELETE /admin/product/deleteSku/{skuId}
// deleteSku

// GET /admin/product/getSkuById/{skuId}
// getById


// GET /admin/product/inner/findSkuInfoByKeyword/{keyword}
// findSkuInfoByKeyword

// POST /admin/product/inner/findSkuInfoBySkuIdList
// findSkuInfoBySkuIdList

// GET /admin/product/list/{page}/{limit}
// index

// POST /admin/product/saveSkuInfo
// saveSkuInfo
// POST /admin/product/updateSkuInfo
// updateSkuInfo
// GET /admin/product/spuImageList/{spuId}
// getSpuImageList

// GET /admin/product/spuSaleAttrList/{spuId}
// getSpuSaleAttrList



// GET /admin/product/findBySpuId/{spuId}
// findBySpuId
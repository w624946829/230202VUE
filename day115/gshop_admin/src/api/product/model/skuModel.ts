// sku的平台属性对象的接口类型
export interface SkuAttrValueModel { 
    id?: number // id标识
    skuId?: number // sku的id标识
    attrName?: string // 平台属性名字
    valueName?: string // 属性值的名字
    attrId: number // 平台属性对象的id标识
    valueId: number // 属性值的id标识
  }
  // sku的平台属性对象数组的接口类型
  export type SkuAttrValueListModel = SkuAttrValueModel[]
  // sku的图片对象的接口类型
  export interface SkuImageModel { 
    id?: number // id标识
    skuId?: number // sku的id标识
    imgName: string // 图片名字
    imgUrl: string // 图片的地址
    spuImgId?: number // 所属spu的id标识
    isDefault?:number // 默认的标识
  }
  // sku的图片对象数组的接口类型
  export type SkuImageListModel = SkuImageModel[]
// sku的销售属性对象数组的接口类型
export interface SkuSaleAttrValueModel {
    id?: number // id标识
    skuId?: number // sku的id标识
    spuId?: number // spu的id标识
    saleAttrId?: number // 所属销售属性对象的id标识
    saleAttrName?: string // 销售属性名字
    saleAttrValueId?: number // 销售属性值的id标识
    saleAttrValueName?: string // 销售属性值的名字
}
// sku的销售属性对象数组的接口类型
export type SkuSaleAttrValueListModel = SkuSaleAttrValueModel[]
// slu对象的接口类型
export interface SkuModel {
id?: number // id标识
spuId?: number // spu的id标识
price?: number // 价格
tmId?: number // 所属品牌的id标识
category3Id?: number // 所属三级分类的id标识
skuName: string // sku的名字
skuDesc: string // sku的描述
weight: number // 重量
isSale?: number // 是否上架
skuDefaultImg:string // 默认图片
skuImageList: SkuImageListModel // 图片对象数组
skuAttrValueList: SkuAttrValueListModel // 平台属性对象数组
skuSaleAttrValueList: SkuSaleAttrValueListModel // 销售属性对象数组

}


  

// sku对象数组的接口类型
export type SkuListModel = SkuModel[]
// sku对象的分页api接口函数返回值的接口数据类型
export interface SkuPageListModel{
    records:SkuListModel // sku对象的数组
    total:number // 总记录数
}
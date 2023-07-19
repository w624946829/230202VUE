// spu的销售属性值对象接口数据类型
export interface SpuSeleAttrValueModel{
id?: number,//id标识
spuId?: number,//spu的id标识
isChecked?: boolean,//是否选中的标识
baseSaleAttrId: number,//所属销售属性对象的id标识
saleAttrValueName: string,//销售属性名字
saleAttrName?: string,//属性值名字

}
// spu的销售属性值对象数组的接口类型
export type SpuSeleAttrValueListModel = SpuSeleAttrValueModel[]
// spu的销售属性对象接口类型
export interface SpuSaleAttrModel {
    id?:number,//id标识
    spuId?:number,//spu的id标识
    saleAttrName?:string,//销售属性名字
    baseSaleAttrId:number,//所属的基础销售属性的id
    // spuSaleAttrValueList:[],//销售属性值对象数组
    spuSaleAttrValueList:SpuSeleAttrValueListModel,//销售属性值对象数组
    isShowEdit?:boolean,//编辑和查看模式的标识--暂时用不到
}

// spu的销售属性对象数组接口类型
export type SpuSaleAttrListModel = SpuSaleAttrModel[]
// spu的图片对象接口类型
export interface SpuImageModel {
    id?:number,//id标识
    spuId?:number,//spu的id标识
    imgName:string,//图片名字
    imgUrl:string,//图片地址

    name?:string,//图片名字
    url?:string,//图片地址
    response?:{ //上传成功后的返回值数据
        data:string
    },
    isDefault?:number// 默认图片地址
}
// spu的图片对象数组接口类型
export type SpuImageListModel = SpuImageModel[]
// spu对象的接口类型
export interface SpuModel {
    id?:number,//id标识
    tmId?:number,//品牌id标识
    category3Id?:number,//三级分类id标识
    spuName?:string,//spu的名字
    description:string, //描述信息
    spuSaleAttrList:SpuSaleAttrListModel,//销售属性对象数组
    spuImageList:SpuImageListModel,//图片对象数组
    
}
// spu对象数组接口类型
export type SpuListModel = SpuModel[]
// spu对象数组的分页api接口函数返回值的接口函数
export interface SpuPageListModel {
    records:SpuListModel,//spu对象数组
    total:number,//总记录数
}
// spu的分页api接口函数所需要的参数的接口类型
export interface SpuPageParamsModel {
    limit:number,//每页显示的条数
    page:number,//页码
    category3Id:number,//三级分类id标识
}

// 基础的销售属性对象接口类型
export interface BaseSaleAttrModel {
    id:number //id标识
    name:string //名字
}

// 基础的销售属性对象数组接口类型
export type BaseSaleAttrListModel = BaseSaleAttrModel[]


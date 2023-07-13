// 品牌相关的数据类型的
export interface TrademarkModel {
    id?:number // id标识
    tmName:string //品牌名字
    logoUrl:string // 品牌的图片地址
}
// 定义一个关于品牌对象列表的是数组类型
export type TrademarkListModel = TrademarkModel[]
// 定义一个关于分页相关的品牌数据的类型
export interface TrademarkPageModel {
    records:TrademarkListModel //用来存储分页的品牌列表数组数据
    total:number // 总记录数
}
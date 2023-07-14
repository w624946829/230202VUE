// 品牌相关的数据类型
export interface TrademarkModel{
    id?: number;
    logoUrl: string;
    tmName: string;
}
// 定义一个关于品牌对象列表的数组类型
export type TrademarkListModel = TrademarkModel[];
// 定义一个关于分页相关品牌类型的数据
export interface TrademarkPageModel{
    records:TrademarkListModel //用来存储分页的品牌列表数组数据
    total:number //总条数
}
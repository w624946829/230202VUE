export interface TrademarkModel {
    id?:number
    tmName:string
    togoUrl:string
}

export type TrademarkListModel = TrademarkModel[]

export interface TrademarkPageModel{
    records:TrademarkPageModel
    total:number
}
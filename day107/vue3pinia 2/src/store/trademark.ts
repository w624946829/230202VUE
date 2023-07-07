import {defineStore} from 'pinia'

import axios from 'axios'
interface Trademark {
    id:number,
    tmName:string,
    logoUrl:string,
}
export type TrademarkList = Trademark[]

export const useTrademarkStor = defineStore('trademarker',{
    state:()=>{
        return {
            trademarkList: [] as TrademarkList,
            total:0
        }
    },
    actions:{
        async getTrademarkList(page:number,limit:number){
            const url = `/app-dev/admin/product/baseTrademark/1/10`
            const result = await axios.get(url)
            const { records,total } = result.data.data
            this.trademarkList = records
            this.total = total
        }
    }
})
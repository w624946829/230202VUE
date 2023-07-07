import {defineStore} from 'pinia'
import axios from 'axios'
interface Trademark {
    id:number
    tmName:string
    logoUrl:string
}
export type TrademarkList = Trademark[]

// 创建数据及仓库
export const useTrademarkStore = defineStore('trademarker',{
    state:()=>{
        return {
            trademarkList:[] as TrademarkList, //空数组的数据类型转换了
            total:0
        }
    },
    actions:{
        async getTrademarkList(page:number,limit:number){
            const url=`/app-dev/admin/product/baseTrademark/1/10`
            const result = await axios.get(url)
            const {records,total} = result.data.data
            this.trademarkList = records
            this.total = total
        }
    }
})
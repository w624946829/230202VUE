// 引入pinia创建品牌数据的仓库
import { defineStore } from 'pinia'
// 引入axios
import axios from 'axios'
// 定义interface数据类型
interface Trademark {
    id: number;
    tmName: string;
    logoUrl: string;
}
export type TrademarkList=Trademark[]

// 创建数据及仓库
export const useTrademarkStore = defineStore('trademarker',{
    state:()=>{
        return {
            trademarkList:[] as TrademarkList,
            total:0
        }
    },
    actions:{
        async getTrademarkList(page:number,limit:number){
           const url =  `/dev-api/${page}/${limit}`
           const result = await axios.get(url)
          
        }
    }
})
// 引入pinia中用来定义仓库的api
import {defineStore} from 'pinia'
// 创建一个子的仓库
export const useCountStore = defineStore('couters',{
    // 用来存储状态数据的
    state:()=>{
        return {
            count:10 // 存储数据
        }
    },
    // 修改状态数据的对象
    actions:{
        // 增加
        increment(num:number){
            this.count += num
        },
        // 减少
        decrement(num:number){
            this.count -= num
        },
        // 奇数加
        incrementIfOrOdd(num:number){
            if(this.count % 2 !== 0){
                this.count += num
            }
        },
        // 异步加
        incrementAsync(num:number){
            setTimeout(()=>{
                this.count += num 
            },1000)
        },
    
    },
    // 计算属性相关
    getters:{
        // 奇数和偶数的结果
        evenOrOdd:(state):string =>{
            return state.count % 2 === 0 ? '偶数' : '奇数'
        },
        // 新的数据
        newCount(state){
            return state.count * 2
        },
        // state和this都可以使用的写法
        getCountResult(state):number {
            return this.count * 2 + state.count
        }
    }
})
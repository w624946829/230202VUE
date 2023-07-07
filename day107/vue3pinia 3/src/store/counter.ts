import {defineStore} from 'pinia'
export const useCountStore = defineStore('counter',{
    state:()=>{
        return {
            count:10
        }
    },
    actions:{
        increment(num:number){
            this.count += num 
        },
        decrement(num:number){
            this.count -= num 
        },
        incrementIfOrOdd(num:number){
            if(this.count % 2 !== 0 ){
                this.count += num 
            }
        },
        incrementAsync(num:number){
            setTimeout(()=>{
                this.count += num
            },1000)
        }
    },
    getters:{
        evenOrOdd:(state):string => {
            return state.count % 2 === 0 ? '偶数' : '奇数'
        },
        newCount(state){
            return state.count * 2
        },
        getCountResult(state):number{
            return this.count * 2 + state.count
        }
    }
})
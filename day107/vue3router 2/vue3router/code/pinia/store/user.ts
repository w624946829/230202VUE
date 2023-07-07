// 引入定义仓库的函数
import { defineStore } from 'pinia'
export const userUserStore = defineStore({
    id:'user',
    state:()=>{
        return{
            name:'小明',
            age:20
        }
    } ,
    //计算属性 
    getters:{
        getAge():number{
            return this.age * 2
        }
    }
})
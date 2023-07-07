import {defineStore} from 'pinia'
export const useUserStore = defineStore({
    id:'user',
    state:()=>{
        return {
            name:'张三',
            age:18
        }
    },
    getters: {
        getAge():number{
            return this.age * 2
        }
    }

})
//这个模块中写四个核心概念
export default {
    state:{
     count :6   
    },
    mutations:{
        ADDCOUNT(state){
            state.count ++
        },
        SUBCOUNT(state){
            state.count --
        }
    },
    actions:{
        incrementCount(ministore){
            ministore.commit('ADDCOUNT')
        },
        decrementCount({commit}){
            commit('SUBCOUNT')
        },
        oddIncrementCount({commit,state}){
            if(state.count% 2 == 1){
                commit('ADDCOUNT')
            }
        },
        asyncIncrementCount({commit}){
            setTimeout(()=>{
                commit('ADDCOUNT')
            },2000)
        }
        
    },
    getters:{
       flodCount(state){
        return state.count * 10
       }
    },
}
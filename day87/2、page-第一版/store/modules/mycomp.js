export default{
    namespaced: true,//开启命名空间
    state:{
        count:7
    },
    mutations:{
        ADD(state){
            state.count ++
        }
    },
    actions:{
        increment({commit}){
            commit('ADD')
        }
    },
    getters:{
        tenflodCount(state){
            return state.count *10
        }
    }
}
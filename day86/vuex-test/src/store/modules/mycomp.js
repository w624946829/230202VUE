export default{
    namespaced:true,
    state:{
        count:15
    },
    mutations:{
        ADD(state){
            state.count++;
        },
        SUB(state) {
            state.count--
        },
        CHANGEMSG(state,str){
            state.msg += str
        }
    },
    actions:{
        increment({commit}){
            commit('ADD')
        },
        decrementCount({ commit }) { // 解构commit
            commit('SUB')
        },
        isEvenIncrementCount({ commit, state }) {
            if (state.count % 2 == 0) {
                commit('ADD')
            }
        },
        asyncIncrementCount({ commit }) {
            setTimeout(() => {
                commit("ADD")
            }, 2000)
        },
    },
    getters:{
        tenflodCount(state){
            return state.count * 10 
        } ,
       
    }

}
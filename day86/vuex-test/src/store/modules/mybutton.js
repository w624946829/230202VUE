export default{
    state:{
        count :'10'
    },
    mutations:{
        ADDCOUNT(state) {
            state.count++
        },
        SUBCOUNT(state) {
            state.count--
        },
        CHANGEMSGCOUNT(state,str){
            state.msg += str
        }
    },
    actions:{
        incrementCount(miniStore) { // miniStore是一个缩小版本store
            miniStore.commit('ADDCOUNT') // 调用mutations中的方法,用来修改数据
        },
        decrementCount({ commit }) { // 解构commit
            commit('SUBCOUNT')
        },
        isEvenIncrementCount({ commit, state }) {
            if (state.count % 2 == 0) {
                commit('ADDCOUNT')
            }
        },
        asyncIncrementCount({ commit }) {
            setTimeout(() => {
                commit("ADDCOUNT")
            }, 2000)
        },
    },
    getters:{}
}
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        count:5,
        message:'我爱你'
    },
    mutations:{
        ADD(state){
            state.count ++
        },
        SUB(state){
            state.count --
        },
        CHANGMSG(state,str1){
            state.message += str1
        }

    },
    actions:{
        increment(ministore){
            ministore.commit('ADD')
        },
        decrement({commit}){
            commit('SUB')
        },
        isEvenIncrement({commit,state}){
            if(state.count %2 == 0){
                commit('ADD')
            }
        },
        asyncIncrement({commit}){
            setTimeout(()=>{
                commit('ADD')
            },2000)
        },
        changeMsg({commit},str1){
            commit('CHANGMSG',str1)
        }
    },
    getters:{
        tenflodCount(state){
            return state.count * 10
        }

    }
})
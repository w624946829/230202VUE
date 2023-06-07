import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import mybutton from './modules/mybutton'
import mycomp from './modules/mycomp'


export default new Vuex.Store({
    //这个一个对象，对象中放模块
    modules:{
        mybutton,
        mycomp
    },

    state:{
        count:5,
        
        msg:'我爱你' 
    },
    mutations:{
        ADD(state){
            state.count ++
        },
        SUB(state){
            state.count --
        },
        CHANGMSG(state,str){
            state.msg += str
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
            if(state.count %2== 0){
                commit('ADD')
            }
        },
        asyncIncrement({commit}){
            setTimeout(()=>{
                commit('ADD')
            },2000)
        },
        changeMsg({commit},str){
            commit('CHANGMSG',str)
        }
        
    },
    getters:{
        tenflodCount(state){
            return state.count * 10
        }
    },
})


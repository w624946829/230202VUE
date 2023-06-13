// 1. 安装
// npm i vuex@3
// 2. 引入使用
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import mybutton from '@/store/modules/mybutton'
import mycomp from '@/store/modules/mycomp'
// 3. 创建并暴露(store实例)
export default new Vuex.Store({
    // modules使用一个对象，用来存放模块
    modules:{
        mybutton,mycomp
    },
    // 4个核心概念
    // state 是一个对象,用来存放数据的
    state: {
        count: 5,
        msg:"我爱你"
    },
    // mutations 是一个对象,里面放方法,这些方法用来修改state中的数据
    // 特点: 不能存在异步
    mutations: {
        // 方法名一般情况下全大写(预定俗称规范)
        ADD(state) {
            state.count++
        },
        SUB(state) {
            state.count--
        },
        CHANGEMSG(state,str){
            state.msg += str
        }
    },
    // actions 是一个对象,里面放方法,这些方法用来调用mutations中的方法修改数据
    // 特点: 可以存在异步
    // actions中的方法用来给 vue中的实例去调用(可以把actions理解成vue和vuex之间的桥梁)
    actions: {
        increment(miniStore) { // miniStore是一个缩小版本store
            miniStore.commit('ADD') // 调用mutations中的方法,用来修改数据
        },
        decrement({ commit }) { // 解构commit
            commit('SUB')
        },
        isEvenIncrement({ commit, state }) {
            if (state.count % 2 == 0) {
                commit('ADD')
            }
        },
        asyncIncrement({ commit }) {
            setTimeout(() => {
                commit("ADD")
            }, 2000)
        },
        changeMsg({commit},str){
            commit('CHANGEMSG',str)
        }
    },
    // getters 是一个对象,里面放函数(但意思不是函数)
    // 可以把里面的方法理解成像 vue组件中的计算属性中的get
    getters: {
        tenflodCount(state) {
            return state.count * 10
        }
    }
})
// 4. 在main.js中关联store(和vm实例进行关联)

// 大步骤:
// 一   让项目使用上vuex
//     1. 安装
//     2. 引入使用
//     3. 创建并暴露(store实例)  export default new Vuex.Store({})
//     4. 在main.js中关联store(和vm实例进行关联) --  目的是为了让所有的组件可以使用this.$store,这里的this.$store就是步骤3抛出的store实例
// 二  配置4个核心概念(单词不能错)
//     state
//     mutations
//     actions
//     getters
// 三  使用vuex
//     写三连环    调用actions固定写法 dispatch('actions中的方法')    调用mutations固定写法 commit('mutations中的方法') 
//     在页面中调用
//     把数据映射到页面
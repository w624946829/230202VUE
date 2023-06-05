// 1. 安装
// npm i vuex@3
// 2. 引入使用
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import mybutton from './modules/mybutton'

// 3. 创建并暴露(store实例)
export default new Vuex.Store({
    // modules 是一个对象,对象中放模块
    modules: {
        mybutton: mybutton
    },
    // 4个核心概念
    // state 是一个对象,用来存放数据的
    state: {
        count: 5,
        msg: "我爱你"
    },
    mutations: {
        ADD(state) {
            state.count++
        },
        SUB(state) {
            state.count--
        },
        CHANGEMSG(state, str) {
            state.msg += str
        }
    },
    actions: {
        increment(miniStore) {
            miniStore.commit('ADD')
        },
        decrement({ commit }) {
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
        changeMsg({ commit }, str) {
            commit("CHANGEMSG", str)
        }
    },
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
// 三  使用vuex(注意传参)
//     写三连环    调用actions固定写法 dispatch('actions中的方法')    调用mutations固定写法 commit('mutations中的方法') 
//     在页面中调用
//     把数据映射到页面
// 四 辅助函数(注意传参)
// 五 模块化
// 使用模块化:
// 在4个核心配置项中配置 modules ,这个属性用来配置模块化
// 注意:
// 模块化只是把 state 模块化了,其他的 mutations、actions、getters 和之前一模一样
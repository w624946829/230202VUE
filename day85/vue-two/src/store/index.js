import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

export default new Vuex.Store({
//   4个核心概念
// state是一个对象 ，用来存放数据的
state: {
    count: 5,
  },
//   mutations 是一个对象，里面放方法，这些方法是用来修改state中的数据
// 特点：不能存在异步
  mutations: {
    //方法名一般情况下全大写
    ADD(state){
        state.count++;
    }
  },
//   actions 是一个对象，里面放方法，这些方法用来调用mutations中的 方法
// 特点：可以存放异步
// actions中的方法用来给 vue中的实例去调用（可以把actions理解成vue）

  actions: {
    increment(miniStore){
        miniStore.commit('ADD')
    }
  },
  getters: {},
});

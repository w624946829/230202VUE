import Vue from "vue";
import Vuex, { Store } from "vuex";
import user from "./modules/user";
import home from "./modules/home";

Vue.use(Vuex);

const actions = {
  jia({ commit, state }, value) {
    if (state.a === 10) {
      return Promise.reject("已将是10 了 ，不能再继续加了");
    } else {
      commit("JIA", value);
      return "我给你加好了";
    }
  },
};
const mutations = {
  JIA(state, value) {
    state.a += value;
  },
};
const state = { a: 1 };
const getters = {};

export default new Store({
  //开启模块化
  modules: { user, home },
  actions, //保存着用于相应组件‘动作’的函数
  mutations, //保存着用于执行状态修改的函数
  state, //制定初始化的状态
  getters, //vuex层面的计算属性
});

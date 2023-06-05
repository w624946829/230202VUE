//1、安装
// npm i vuex@3
//2、引入使用
import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

// 创建并暴露（store实例）
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
    ADD(state) {
      state.count++;
    },
    SUB(state){
      state.count--;
    }
  },
  //   actions 是一个对象，里面放方法，这些方法用来调用mutations中的 方法
  // 特点：可以存在异步
  // actions中的方法用来给 vue中的实例去调用（可以把actions理解成vue和vuex之间的桥梁）

  actions: {
    increment(miniStore) {
      //miniStore是一个缩小版本store
      miniStore.commit("ADD"); //调用mutations中的方法，用来修改数据
    },
    decrement({commit}){//结构commit
      commit('SUB')
    },
    isEvenIncrement({commit,state}){
      if(state.count % 2 == 0){
        commit('ADD')
      }
    },
    asyncIncrement({commit}){
      setTimeout(()=>{
        commit('ADD')
      },2000)
    }
  },
  // getters是一个对象，，里面放函数（但意思不是函数）
  // 可以把里面的方法理解成像vue组件中的计算属性中的get
  getters: {
    tenflodCount(state) {
      return state.count * 10;
    },
  },
});
// 4、在main.js中关联store（和vm实例进行关联）

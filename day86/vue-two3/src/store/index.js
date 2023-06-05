import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
import axios from "axios";

export default new Vuex.Store({
  state: {
    userlist: [],
    isFirst: true, // isFirst为true代表刷新页面展示欢迎页
    isLoading: false, // true代表是loading状态,false代表不加载状态
    errorMessage: "", // 错误信息,如果这个数据有值,代表页面发生错误,展示错误信息
  },
  mutations: {
    PENDDING(state){
        state.isFirst = false
        state.isLoading = true
    },

    SUCCESS(state, list) {
      state.userlist = list;
      state.isLoading = false
    },

    FAIL( state,error){
        state.isLoading = false;
        state.errorMessage = (error && error.message) || '加载失败,请重试'

    }
  },
  actions: {
    async getUserList({ commit }, keyword) {

        keyword = keyword.trim()
            if (!keyword) {
                alert('请输入内容')
                return
            }
        commit('PENDDING')
      try {
        let result = await axios.get(
          `https://api.github.com/search/users?q=${keyword}`
        );
        result = result.data.items.map(item=> {
          return {
            id: item.id, // 唯一标识
            avatar: item.avatar_url, // 头像
            username: item.login, // 昵称(用户名)
            htmlUrl: item.html_url, // 用户主页
          };
        });
        console.log( '结果',result);
        commit('SUCCESS', result)
      } catch (error) {
        console.error(error);
        commit('FAIL',error)
      }
    },
  },
  getters: {},
});

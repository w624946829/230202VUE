import { reqUserInfo } from "@/api";
import { message } from "element-ui";

// 服务员函数
const actions = {
  async getUserInfo({ commit }) {
    // 发送请求获取用户信息
    const { code, data, message } = await reqUserInfo();
    // 判断是否获取成功
    if (code === 200) {
      // 响应成功，调用厨师函数进行加工
      commit("SAVE_USER_INFO", data);
    } else {
      // 响应失败，抛出错误并且让Promise失败
      message.error(message);
      return Promise.reject();
    }
  },
};
// 厨师函数
const mutations = {
  SAVE_USER_INFO(state, info) {
    state.info = info;
  },
};
// 原材料存放函数
const state = {
  info: {},
};

const getters = {};

// vuex 的模块化及命名空间开启后的书写

export default {
  //命名空间开启
  namespaced: true,
  actions,
  mutations,
  state,
  getters,
};

// 其他的地方调用服务员函数使用
// 因为在服务员函数中涉及到请求，所用调用者需要使用syanc/await，同时进行promise捕捉
// store.dispath('当前模块名/getUserInfo')

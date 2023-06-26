import { reqUserInfo } from "@/api";
import { Message } from "element-ui";

const actions = {
  async getUserInfo({ commit }) {
    // 发送请求获取用户信息
    const {code,data,message} = await reqUserInfo();
    // 判断是否获取成功
    if (code === 200) {
      commit("SAVE_USER_INFO", data);
    } else {
      Message.error(Message);
    }
  },
};
const mutations = {
    SAVE_USER_INFO(state,info){
        state.info = info
    }
};
const state = {
    info: {}
};
const getters = {};
export default {
  namespaced: true,
  actions,
  mutations,
  state,
  getters,
};

import { reqUserInfo,reqQuit } from "@/api";
import { Message } from "element-ui";
import { deleteToken } from "@/utils/auth";
import router from '@/router'

const actions = {
  async getUserInfo({ commit }) {
    // 发送请求获取用户信息
    const {code,data,message} = await reqUserInfo();
    // 判断是否获取成功
    if (code === 200) {
      commit("SAVE_USER_INFO", data);
    } else {
      Message.error(message);
      return Promise.reject()
    }
  },
  // 退出登录
  async getLogout({commit}){
    const {code,data,message} = await reqQuit()
    if (code === 200) {
      Message.success('退出登录成功');
      commit("CLEAR_USER_INFO");
      deleteToken()
      router.push('/login')

    } else {
      Message.error(result.message)
  }
}
};

  
const mutations = {
    SAVE_USER_INFO(state,info){
        state.info = info
    },
    CLEAR_USER_INFO(state){
      state.info={}
    }
};
const state = {
    info: {},
    once:{}
};
const getters = {};
export default {
  namespaced: true,
  actions,
  mutations,
  state,
  getters,
};

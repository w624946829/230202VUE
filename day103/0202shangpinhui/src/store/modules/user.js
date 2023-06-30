import { reqUserInfo,reqQuit } from "@/api";
import { Message } from "element-ui";
import { deleteToken } from "@/utils/auth";
import router from '@/router'

const actions = {
  async getUserInfo({ commit }) {
    // 发送请求获取用户信息
    const {code,data} = await reqUserInfo();
    // 判断是否获取成功
    if (code === 200) {
      commit("SAVE_USER_INFO", data);
    } else {
      Message.error('身份过期，请重新登录');
      return Promise.reject()
    }
  },
  // 退出登录
  async getLogout({commit},value){
    // 1、联系服务器删除token
    const {code,message} = await reqQuit()
    if (code === 200) {
      // 提示
      value ? Message.warning(value) : Message.success('退出登录成功')
      
      // 3、删除vuex中的信息
      commit("CLEAR_USER_INFO");
      // 4、删除本地的token
      deleteToken()
      // 5、跳转到登录页面
      router.push('/login')

    } else {
      Message.error(message)
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
};
const getters = {};
export default {
  namespaced: true,
  actions,
  mutations,
  state,
  getters,
};

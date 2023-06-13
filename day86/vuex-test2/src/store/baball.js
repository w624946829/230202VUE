import Vue from 'vue';
import vuex from 'vuex'
import myball from '@/store/modules/myball'
Vue.use(vuex)
import {reqCategoryList} from '@/api'
const actions = {
    async getCategoryList({commit}){
        let {code,data,message} = await reqCategoryList()
        if(code === 200){
            commit('SAVE_CATEGORY_LIST',data)
        }else{
            alert(message)
        }
    }
};
const mutations={
    SAVE_CATEGORY_LIST(state,list ){
        state.categoryList = list;
    }
};
const state = {
    categoryList:[]
};
const getters = {};

const store = new vuex.Store({
    modules:{myball},
    actions,
    mutations,
    state,
    getters
})

export default store
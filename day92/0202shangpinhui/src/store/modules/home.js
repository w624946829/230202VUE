/*
 * @Author: 王泽昌 624946829@qq.com
 * @Date: 2023-06-12 14:09:08
 * @LastEditors: 王泽昌 624946829@qq.com
 * @LastEditTime: 2023-06-12 15:47:30
 * @FilePath: \0202shangpinhui\src\store\modules\home.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import {reqCategoryList}  from '@/api'
const actions={
    //获取首页三级分类的数据
   async getCategoryList({commit}){
    // 发送请求获取三级分类数据
    let {code,data,message} = await reqCategoryList()
    // 判断业务逻辑是否成功
    if(code === 200){
        commit('SAVE_CATEGORY_LIST',data)
    }else{
        alert(message)
    }
   }
};

const mutations={
    SAVE_CATEGORY_LIST(state,list){
        state.categoryList = list.slice(0,15)
    }
};
const state={
    categoryList:[]
};
const getters={

};
export default {
    namespaced:true,
    actions,
    mutations,
    state,
    getters
   }
   
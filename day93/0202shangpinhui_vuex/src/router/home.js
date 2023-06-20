import { reqCategoryList,reqSlideList } from "@/api";

const actions = {
    // 专门用于获取首页三级分类的action
    async getCategoryList({commit}){
        let {code,data,message} = await reqCategoryList()
        if(code === 200){
            commit ('SAVE_CATEGORY_LIST',data)

        }else{
            alert(`获取首页分类数据失败： ${message}`)
        }
    },

    // 专门用于获取首页轮播图的action
    async getSlideList({commit}){
        let {code,data,message} = await reqSlideList()
        if(code === 200){
            commit ('SAVE_SLIDE_LIST',data)

        }else{
            alert(`获取首页分类数据失败： ${message}`)
        }
    },

}
const mutations = {
    SAVE_CATEGORY_LIST(state,list){
        state.categoryList = list.slice(0,15)
    },
    SAVE_SLIDE_LIST(state,list){
        state.slideList = list 
    }
}
const state = {
    categoryList:[],
    slideList:[],
    
}
const getters = {}
export default{
namespaced:true,
state,mutations,actions,getters
}
// 引入定义仓库的函数
import { defineStore } from "pinia";
// 引入分类相关的数据类型
import { CategoryIdsModel,CategoryListModel } from "@/api/product/model/categoryModel";
// 定义仓库的状态数据的返回值的接口类型
export interface CategoryStateModel extends CategoryIdsModel{
    category1List:CategoryListModel;
    category2List:CategoryListModel;
    category3List:CategoryListModel;
}
// 定义分类信息的仓库
export const useCategoryStore = defineStore({
    id:'category',//仓库的id标识
    // 状态数据
    state:():CategoryStateModel=>{
        return {
            category1Id:undefined,// 一级分类的id
            category2Id:undefined,// 二级分类的id
            category3Id:undefined,// 三级分类的id
            category1List:[],// 一级分类的列表数据
            category2List:[],// 二级分类的列表数据
            category3List:[],// 三级分类的列表数据
        }
    }
    // 计算属性
    // getters: { }

    // actions:{}
})

// 暴露出去
export default useCategoryStore;
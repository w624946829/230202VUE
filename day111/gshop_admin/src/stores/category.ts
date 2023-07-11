// 引入定义仓库的函数
import { defineStore } from "pinia";
// 引入分类相关的数据类型
import { CategoryIdsModel,CategoryListModel } from "@/api/product/model/categoryModel";
// 引入分类相关的接口函数
import { getCategory1ListApi,getCategory2ListApi,getCategory3ListApi } from '@/api/product/category'
import { number } from "echarts/core";

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
    },
    // 计算属性,,用于获取分类信息的状态数据
    getters: {
        // 一级分类id
        getCategory1Id():number {
            return this.category1Id as number;
        },
        // 二级分类id
        getCategory2Id():number {
            return this.category2Id as number;
        },
        // 三级分类id
        getCategory3Id():number {
            return this.category3Id as number;
        },
        // 一级分类列表数据
        getCategory1List():CategoryListModel {
            return this.category1List
        },
        // 二级分类列表数据
        getCategory2List():CategoryListModel {
            return this.category2List
        },
        // 三级分类列表数据
        getCategory3List():CategoryListModel {
            return this.category3List
        }

     },

    /*
    逻辑：
        获取一级分类列表数据-->点击一级分类列表数据-->获取二级分类列表数据-->点击二级分类列表数据-->获取三级分类列表数据
    
    */  

    actions:{
        // 获取一级分类列表数据 
        async getCategoryList1(){
            // 调用接口函数
            this.category1List = await getCategory1ListApi()
            
        },
        // 获取二级分类列表数据 
        async getCategoryList2(category1Id:number){
            // 先把传入进来的一级分类id存储起来
            this.category1Id = category1Id
             // 调用接口函数
             this.category2List = await getCategory2ListApi(category1Id)
             this.category2Id = undefined;//清理掉选中的二级分类的
             this.category3Id = undefined;
             this.category3List = []
        },
        // 获取三级分类列表数据 
        async getCategoryList3(category2Id:number){
            // 先把传入进来的二级分类id存储起来
            this.category2Id = category2Id
             // 调用接口函数根据一级分类的id获取耳机分类列表数据
             this.category3List = await getCategory3ListApi(category2Id)
             this.category3Id = undefined
        }
    },
})

// 暴露出去
export default useCategoryStore;
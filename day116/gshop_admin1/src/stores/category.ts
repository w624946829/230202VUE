import {defineStore} from 'pinia'

import {CategoryListModel,CateogryIdsModel} from '@/api/product/model/categoryModel'
import { getCategory1ListApi, getCategory2ListApi, getCategory3ListApi } from '@/api/product/category'


export interface CategoryStateModel extends CateogryIdsModel {
    category1List:CategoryListModel
    category2List:CategoryListModel
    category3List:CategoryListModel
}
// 定义分类信息的仓库
export const useCategoryStore = defineStore({
    id:'category',
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

    actions:{
        // 获取一级分类列表数组数据
        async getCategoryList1(){
            this.category1List = await getCategory1ListApi()
        },
        // 获取二级分类列表数组数据
        async getCategoryList2(category1Id:number){
            this.category1Id = category1Id
            this.category2List = await getCategory2ListApi(category1Id)
            this.category2Id = undefined
            this.category3Id = undefined
            this.category3List = []
        },
        // 获取三级分类列表数组数据
        async getCategoryList3(category2Id:number){
            // 先把传入进来的二级分类id存储起来
            this.category2Id = category2Id
             // 调用接口函数根据一级分类的id获取耳机分类列表数据
             this.category3List = await getCategory3ListApi(category2Id)
             this.category3Id = undefined
        }
    }
})

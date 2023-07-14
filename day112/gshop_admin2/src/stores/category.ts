import {defineStore} from 'pinia'

import type {CategoryListModel,CateogryIdsModel} from '@/api/product/model/categoryModel'
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
            category1Id:undefined,
            category2Id:undefined,
            category3Id:undefined,
            category1List:[],
            category2List:[],
            category3List:[]
        }
    },
    getters: {
      getCategory1Id:function (): number {
        return this.category1Id as number
      }  ,
        getCategory2Id:function (): number {
            return this.category2Id as number
        },
        getCategory3Id:function (): number {
            return this.category3Id as number
        },
        // 一级分类列表数据
        getCategory1List:function () :CategoryListModel {
            return this.category1List
        },
        // 二级分类列表数据
        getCategory2List:function () :CategoryListModel {
            return this.category2List
        },
        getCategory3List:function () :CategoryListModel {
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
            this.category2Id = category2Id
            this.category3List = await getCategory3ListApi(category2Id)
            this.category3Id = undefined
        }
    }
})

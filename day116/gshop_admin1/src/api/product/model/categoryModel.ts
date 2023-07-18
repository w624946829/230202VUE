// 需要使用interface定义分类信息对象的数据类型
export interface CategoryModel{
    id?:number
    name:string
    hasChildren?:boolean// 标识的是是否有子级分类信息的标识
    level?:number // 当前分类的级别

}

// 需要定义分类信息对象数组的数据类型
export type CategoryListModel = CategoryModel[]
// 定义分类id的数据类型
export type Numberable = number | undefined
// 定义一个用来存储三个分类信息数据的id的数据类型
export interface CateogryIdsModel{
    category1Id:Numberable
    category2Id:Numberable
    category3Id:Numberable
}
// 定义平台属性值对象数据类型
export interface AttrValueModel {
    id: number;
    valueName: string;
    attrId:number//平台属性对象的id
}
// 定义平台属性对象数组数据类型
export type AttrValueListModel = AttrValueModel[]
// 定义平台属性对象数据类型
export interface AttrInfoModel {
    id?:number
    attrName:string,
    categoryId:number,//平台属性对应的分类的id
    categoryLevel:number,//对应的分类的界别
    attrValueList:AttrValueListModel//平台属性值列表
}
// 定义平台属性对象数组数据类型
export type AttrInfoListModel = AttrInfoModel[]
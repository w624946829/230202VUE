// 定义平台属性值对象数据类型
export interface AttrValueModel{
    id: number;
    valueName: string;
    attrId: number;// 平台属性对象的id
    // isEnabled: number;// 是否显示或者隐藏的标识--- 标记和查看模式的一个标识
}
// 定义平台属性对象数组数据类型
export type AttrValueListModel = AttrValueModel[];
// 定义平台属性对象数据类型
export interface AttrInfoModel{
    id?: number,
    attrName: string,
    categoryId: number,//平台属性对应的分类的id
    categoryLevel: number,//对应的分类的级别
    attrValueList: AttrValueListModel,//平台属性只对象数组
}
// 定义平台属性对象数组数据类型
export type AttrInfoListModel = AttrInfoModel[];
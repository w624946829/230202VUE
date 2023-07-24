// 给文件主要对项目中的所有请求接口，进行统一管理，方便以后的升级和维护
import ajax from './ajax'
// 请求分类列表数据
export const reqCategoryList = ()=>ajax.get('/product/getBaseCategoryList')

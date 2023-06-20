let express = require('express');
let router = express.Router();

//初始化一个用于保存人的数组
let personArr = [
	{id:'1618480594484',name:'张三',age:18},
	{id:'1618480602480',name:'李四',age:19},
	{id:'1618480614531',name:'王五',age:19},
]

/**
 * @api {get} /person 2_根据 id 获取一个人
 * @apiDescription query参数
 * @apiGroup 人员管理
 * @apiVersion 1.0.0
 * @apiParam {string} id 人员唯一标识
 * @apiSuccessExample {json} 请求成功示例:
 * {
 *   "state": 1,
 *   "msg": "获取成功！",
 *   "data": {
 *      "id": '1618480594484',
 *      "name": "张三",
 *      "age": 18
 *    }
 * }
 *
 */
//根据id获取一个人的信息---- 参数：id ------参数类型：query参数
router.get('/person',(req,res)=>{
	const {id} = req.query
	if(!id) {
		res.send({state:0,msg:'id不能为空',data:null})
		return
	}
	npersonArr = personArr.filter((item)=>{
		return item.id === id
	})
	if(npersonArr.length == 0){
		res.send({state:1,"msg": "未能查到此人",data:npersonArr[0]})
	}else{
		res.send({state:1,"msg": "获取成功！",data:npersonArr[0]})
	}
})

/**
 * @api {get} /filter/age 3_根据 age 获取一些人
 * @apiDescription params参数
 * @apiGroup 人员管理
 * @apiVersion 1.0.0
 * @apiParam {number} age 人员年龄
 * @apiSuccessExample {json} 请求成功示例:
 * {
 *   "state": 1,
 *   "msg": "获取成功！",
 *   "data": [{
 *      "id": '1618480594484',
 *      "name": "张三",
 *      "age": 18
 *    }]
 * }
 *
 */
//根据age获取人员列表---- 参数：age------参数类型：params参数
router.get('/filter/:age',(req,res)=>{
	const {age} = req.params
	if(age === undefined) {
		res.send({state:0,msg:'age不能为空',data:null})
		return
	}
	npersonArr = personArr.filter((item)=>{
		return item.age == age
	})
	if(npersonArr.length == 0){
		res.send({state:0,"msg": "没有符合条件的人",data:null})
	}else{
		res.send({state:1,"msg": "获取成功！",data:npersonArr})
	}
})

/**
 * @api {post} /person 4_添加一个人
 * @apiDescription 请求体参数
 * @apiGroup 人员管理
 * @apiVersion 1.0.0
 * @apiParam {string} name 名字
 * @apiParam {number} age 年龄
 * @apiSuccessExample {json} 请求成功示例:
 * {
 *   "state": 1,
 *   "msg": "添加成功！",
 *   "data": {
 *      "id": '1618480594484',
 *      "name": "张三",
 *      "age": 18
 *    }
 * }
 *
 */
//添加一个人-----参数：name,age	-----参数类型：请求体参数
router.post('/person',(req,res)=>{
	const {name,age} = req.body
	if(!name || !age){
		res.send({state:0,msg:'添加失败，名字和年龄均不能为空',data:null})
		return
	}
	personArr.push({id:Date.now().toString(),name,age:age*1})
	res.send({state:1,msg: "添加成功！",data:personArr.reverse()[0]})
})

/**
 * @api {put} /person 5_更新一个人
 * @apiDescription 请求体参数
 * @apiGroup 人员管理
 * @apiParam {string} id 人员唯一标识
 * @apiParam {string} name 人员名字
 * @apiParam {number} age 人员年龄
 * @apiVersion 1.0.0
 * @apiSuccessExample {json} 请求成功示例:
 * {
 *   "state": 1,
 *   "msg": "更新成功！",
 *   "data": {
 *      "id": '1618480594484',
 *      "name": "张三",
 *      "age": 19
 *    }
 * }
 *
 */
//更新一个人-----参数：id,name,age-----参数类型：请求体参数
router.put('/person',(req,res)=>{
	const {id,name,age} = req.body
	let person = personArr.find((item)=>{return item.id === id})
	if(person){
		person.name = name
		person.age = age*1
		res.send({state:1,msg: "更新成功！",data:person})
	}else{
		res.send({state:0,msg:'更新出错，未找到对应id',data:null})
	}
})

/**
 * @api {delete} /person 6_删除一个人
 * @apiGroup 人员管理
 * @apiDescription 请求体参数
 * @apiParam {string} id 人员唯一标识
 * @apiVersion 1.0.0
 * @apiSuccessExample {json} 请求成功示例:
 * {
 *   "state": 1,
 *   "msg": "删除成功！",
 *   "data": '1618480594484',
 * }
 *
 */
//删除一个人-----参数：id-----参数类型：请求体参数
router.delete('/person',(req,res)=>{
	const {id} = req.body
	nPersonArr = personArr.filter((item)=>{
		return item.id !== id
	})
	if(nPersonArr.length !== personArr.length ){
		personArr = nPersonArr
		res.send({state:1,msg:'删除成功',data:id})
	}else{
		res.send({state:0,msg:'删除失败',data:null})
	}
})

/**
 * @api {get} /persons 1_获取所有人
 * @apiDescription 无需参数
 * @apiGroup 人员管理
 * @apiVersion 1.0.0
 * @apiSuccessExample {json} 请求成功示例:
 * {
 *   "state": 1,
 *   "msg": "获取成功！",
 *   "data": [
 * 			{
 * 				id:'1618480594484',
 * 				name:'张三',
 * 				age:18
 * 			},
 *			{
 *	 			id:'1618480602480',
 *				name:'李四',
 *				age:19
 *			},
 * 	 ]
 * }
 *
 */
//获取所有人信息-----无需参数
router.get('/persons',(req,res)=>{
	res.send({state:1,msg: "获取成功",data:personArr.sort()})
})

module.exports = router;
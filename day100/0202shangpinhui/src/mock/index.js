import Mock from 'mockjs'
import slide from './slide.json'
import floor from './floor.json'
Mock.mock('https://www.0202.com/slide','get',{code:200,ok:true,data:slide,message:'成功'})

Mock.mock('https://www.0202.com/floor','get',{code:200,ok:true,data:floor,message:'成功'})
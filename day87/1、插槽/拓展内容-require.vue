<template>
    <div>
      
    </div>
  
</template>

<script>
// 拓展内容
// require.context
// webpack提供的方法，用来检索某一个路径下的目标文件
// 参数
    // 参数一：是一个路径，要检索的路径
    // 参数二：是一个布尔值，是否深度检索
    // 参数三：是一个正则，检索的目标文件
// 返回值
    // 返回一个函数，这个函数不能直接调用，需要传入 参数一（路径）下的文件相对路径
    // 可以得到这个文件模块
    // 返回的函数context可以理解为一个容器,这个容器中放的是所有检索到的文件
// 代码:
//     let ctx = require.context('./components',true,/\.vue/)
// let res = ctx('./Home/index.vue')
    // -----------------
// ctx.keys()
    // 容器调用keys返回一个数组，数组中放的是检索到的所有文件的路径
  
// let ctx = require.context('./components',true,/\.vue/)

// console.log(ctx.keys());//(2) ['./Home/index.vue', './Main/index.vue']
//设置一个对象，属性是组件名，属性值是组件配置项
// let obj = {}

// ctx.keys().forEach(path=>{
//     let module = ctx(path)//拿着路径去容器中获取检索到的模块
// comp是组件的配置对象(第一次 Home组件的配置对象,第二次Main组件的配置对象)
//     console.log(module);
//     let comp = module.default//拿到模块中default的配置项，得到组件的配置项
//     let compName = path.replacr('./','').replace('/index.vue','')
//     obj[compName] = comp

// })
// console.log(obj);
// console.log(Object.keys(obj));


let ctx = require.context('./components',true,/\.vue/)
export default {
    name:"App",
    data(){
        return {
            mycomp:null
        }
    }
}
</script>

<style scoped>

</style>
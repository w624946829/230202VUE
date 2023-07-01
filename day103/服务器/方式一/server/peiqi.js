// 引入express
const express = require('express')
//借助connect-history-api-fallback中间件实现自动处理路径
const apiFallback = require('connect-history-api-fallback')

//创建app服务实例对象
const app = express()

//应用中间件
app.use(apiFallback())
app.use(express.static(__dirname+'/static'))

// 配置后端路由
app.get('/qwe',(request,response)=>{
  response.send('你好，你好酷啊！')
})

app.listen(5000,(error)=>{
  if(error){
    console.log('服务器启动失败',error)
  }else{
    console.log('服务器启动成功','http://localhost:5000')
  }
})

const express = require('express')
const cors = require('cors')
const router = require('./routers/api/users')

const app = express()
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(express.static(__dirname+'/public'))
app.use(cors())

app.use(router)

app.listen(5000,(err)=>{
	if(!err) console.log('服务器启动成功，接口文档地址：http://localhost:5000/api');
	else console.log(err);
})
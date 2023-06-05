const express = require('express');
const app = express();
app.get ('/getUserInfo',(req,res)=>{
    // 后端cors跨域
//    res.setHeader("Access-Control-Allow-Origin","*")

    let userinfo = {
        username:'尼古拉斯~赵四',
        age:28,
        intro:'大米是饭前吃还是饭后吃'
    }
    res.send({
        code: 200,
        data:userinfo,
        message:'success',
    })
        
    
})
app.listen(3000,()=>{
    console.log('启动成功:3000');
})
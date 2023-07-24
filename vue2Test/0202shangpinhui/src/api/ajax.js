import axios from "axios";
import nprogress from "nprogress";
import 'nprogress/nprogress.css'

 const myAxios = axios.create({
    baseURL:'/api',//请求基本路径
    timeout: 5000,//超时时间
    
})

//配置请求拦截器------use 使用的意思
myAxios.interceptors.request.use((config)=>{
//    进度条刚开始走
    nprogress.start()
    // 在请求头中追加一个schoo
    config.headers.school = "atguigu"
    
    return config
})
//配置响应拦截器
myAxios.interceptors.response.use(
    // 响应拦截器成功的回调
    (response)=>{
        // 让进度条停止
        nprogress.done()
        //打印一下成功
        console.log('成功');
        // 将返回的真正数据交给使用者
        return response.data
    },
    // 响应拦截器失败的回调
    (error)=>{
        // 进度条停止
        nprogress.done()
        // 打印一下失败
        console.log('失败');
        // 弹窗提醒失败
        alert(error.message || '未知错误')
        // 中断promise链
        return new Promise(()=>{})
    },
    )

export default myAxios;
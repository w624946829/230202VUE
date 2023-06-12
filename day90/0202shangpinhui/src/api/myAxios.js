import axios from "axios";

 const myAxios = axios.create({
    baseURL:'/sph',//请求基本路径
    timeout: 5000,//超时时间
    
})

//配置请求拦截器------use 使用的意思
myAxios.interceptors.request.use((config)=>{
   
    config.headers.school = "atguigu"
    return config
})
//配置响应拦截器
myAxios.interceptors.response.use(
    ()=>{},
    ()=>{},
    )

export default myAxios;
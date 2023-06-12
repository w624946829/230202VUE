// 二次封装Axios

import axios from "axios";
import nprogress from "nprogress";
import 'nprogress/nprogress.css'

const ajax = axios.create({
  baseURL: "/api", //请求基本路径
  timeout: 5000, //超时时间
});

//配置请求拦截器------use 使用的意思
ajax.interceptors.request.use((config) => {
    nprogress.start()
  config.headers.school = "atguigu";
  return config;
});
//配置响应拦截器
ajax.interceptors.response.use(
  (response) => {
    nprogress.done();
    console.log('成功');
    return response.data;
  },
  (error) => {
    nprogress.done();

    console.log('失败');
    alert(error.message)
    return new Promise(()=>{})
  }
);

export default ajax;

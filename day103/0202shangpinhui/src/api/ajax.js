/*
 * @Author: 王泽昌 624946829@qq.com
 * @Date: 2023-06-13 08:28:37
 * @LastEditors: 王泽昌 624946829@qq.com
 * @LastEditTime: 2023-06-27 12:21:35
 * @FilePath: \day92\0202shangpinhui\src\api\ajax.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 二次封装Axios

import axios from "axios";
import nprogress from "nprogress";
import "nprogress/nprogress.css";
import "@/assets/css/color.css";
import { getUserTempId, getToken } from "@/utils/auth";
import store from "@/store";

const ajax = axios.create({
  baseURL: "/api", //请求基本路径
  timeout: 5000, //超时时间
});

// const ajax = axios.create({
//   baseURL: "http://localhost:8081/api", //请求基本路径
//   timeout: 5000, //超时时间
// });


//配置请求拦截器------use 使用的意思
ajax.interceptors.request.use((config) => {
  nprogress.start();
  // 在请求头中追加token，
  config.headers.userTempId = getUserTempId();
  //
  config.headers.token = getToken();
  return config;
});


//配置响应拦截器
ajax.interceptors.response.use(
  (response) => {
    nprogress.done();
    
    if(response.data.code === 208){
      store.dispatch('user/getLogout','身份过期请重新登录')
      return new Promise(() => {})
    }else{
    console.log("成功");
    return response.data;
  }
},
  (error) => {
    nprogress.done();

    console.log("失败");
    alert(error.message);
    return new Promise(() => {});
  }
);

export default ajax;

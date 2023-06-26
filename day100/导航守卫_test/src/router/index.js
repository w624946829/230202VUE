/*
 * @Author: 王泽昌 624946829@qq.com
 * @Date: 2023-06-26 14:51:47
 * @LastEditors: 王泽昌 624946829@qq.com
 * @LastEditTime: 2023-06-26 15:35:01
 * @FilePath: \导航守卫_test\src\router\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../pages/Home";
import Hot from "../pages/Hot";
import Like from "../pages/Like";
import Near from "../pages/Near";

Vue.use(VueRouter);
//对VueRouter原型上push和replace进行增强，目的是：解决编程式重复跳转报错问题

//暴露路由器
const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/home",
      component: Home,
    },
    {
      path: "/hot",
      component: Hot,
    },
    {
      path: "/like",
      component: Like,
    },
    {
      path: "/near",
      component: Near,
    },
  ],
});

let isVip = false;
let authPath = ["/like", "/near"]; //敏感路由

router.beforeEach((to, from, next) => {
  if (isVip) {
    console.log("您是尊享vip用户，您当前拥有全部权限，可以查看全部内容");
    next();
  } else {
    console.log("您不是尊贵的vip用户，您当前无权查看vip内容，请充值后查看");
    if (authPath.includes(to.path)) {
      console.log("非常抱歉，您当前浏览的是vip专属内容，请充值后查看");
      next("/home");
    } else {
      console.log("您当前查看的是非vip内容，可以正常进行浏览");
      next();
    }
  }
});

export default router;

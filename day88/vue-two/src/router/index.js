import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

import Home from "@/pages/Home";
import About from "@/pages/About";
import Message from "@/pages/Message";
import News from "@/pages/News";

//创建并暴露
export default new VueRouter({
  routes: [
    {

      path: "/home",
      component: Home,
      children: [
        {
          //全写
          //   path: "/home/message",
          //   简写，当路径前面不加/的时候，会拿着当前路径和上一级进行拼接
          path: "message",
          component: Message,
        },
        {
          //   path: "/home/new",
          path: "news",
          component: News,
        },
        {
          // path:'/home',
          // redirect:'/home/message',
          path: "",
          redirect: "message",
        },
      ],
    },
    {
      path: "/about",
      component: About,
    },
    {
      path: "/",
      redirect: "/home",
    },
  ],
});

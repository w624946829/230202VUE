import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

import Home from "@/pages/Home";
import About from "@/pages/About";
import Message from "@/pages/Message";
import News from "@/pages/News";
import MsgDetai from "@/pages/MsgDetail";
import NewsDetail from "@/pages/NewsDetail";

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
          children: [
            {
              name:"MsgDetai",
              path: "msgdetail/:msgId",
              component: MsgDetai,
              // name:'msgDetai',
              // path: "msgdetail/:msgId",
              // component: MsgDetai,

              //接参
              // 方式一
              // props:true
              // 方式二-为了给组件添加额外的额参数，可以使用对象形式（穿不过来params和query）
              // props:{
              //   text:'随便写'
              // }
              // 方式三、函数形式
              // 可以接到一个形参 route，返回一个对象，返回对象的属性名将映射到。。。
              props: (router) => {
                return {
                  msgId: router.params.msgId,
                  content: router.query.content,
                  text: "zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz",
                };
              },
            },
          ],
        },
        {
          //   path: "/home/new",
          path: "news",
          component: News,
          children:[
            {
              name :'NewsDetail',
              //?：参数可以传可以不穿，即便不传也可以匹配到路由
              path:'newsdetail/:newsId?',
              component:NewsDetail

            }
          ]
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

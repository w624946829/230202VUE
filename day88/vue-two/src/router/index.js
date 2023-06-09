import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

import Home from "@/pages/Home";
import About from "@/pages/About";
import Message from "@/pages/Message";
import News from "@/pages/News";
import MsgDetail from '@/pages/MsgDetail'
import NewsDetail from '@/pages/NewsDetail'
export default new VueRouter({
  routes: [
    {
      path: "/home",
      component: Home,
      children: [
        {
          path: "message",
          component: Message,
          children:[
            {
                name:'MsgDetail',
                path: "msgdetail/:msgid",
                component: MsgDetail, 
                // props:true
                // props:{
                //     text:'随便写'
                // }
                props:(router)=>{
                    return{
                        msgid:router.params.msgid,
                        content:router.query.content,
                        text:'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
                    }
                }

            },
            {
                path: "message",
                component: Message, 
            },
          ]
        },
        {
            path: "news",
            component: News,
            children:[
                {
                    name:'NewsDetail',
                path: "newsdetail/:newsId?",
                component: NewsDetail, 
            }
        ]
        },
        {
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

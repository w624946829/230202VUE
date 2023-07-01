"use strict";(self["webpackChunk_0202shangpinhui"]=self["webpackChunk_0202shangpinhui"]||[]).push([[698],{6698:function(t,s,e){e.r(s),e.d(s,{default:function(){return h}});var a=function(){var t=this,s=t._self._c;return s("div",[t.cartInfoList.length?s("div",{staticClass:"cart"},[s("h4",[t._v("全部商品")]),s("div",{staticClass:"cart-main"},[t._m(0),s("div",{staticClass:"cart-body"},t._l(t.cartInfoList,(function(e){return s("ul",{key:e.id,staticClass:"cart-list"},[s("li",{staticClass:"cart-list-con1"},[s("input",{attrs:{type:"checkbox",name:"chk_list"},domProps:{checked:e.isChecked},on:{click:function(s){return s.preventDefault(),t.checkOne(e,s)}}})]),s("li",{staticClass:"cart-list-con2"},[s("img",{attrs:{src:e.imgUrl}}),s("div",{staticClass:"item-msg"},[t._v(t._s(e.skuName))])]),s("li",{staticClass:"cart-list-con4"},[s("span",{staticClass:"price"},[t._v("￥"+t._s(e.cartPrice))])]),s("li",{staticClass:"cart-list-con5"},[s("a",{staticClass:"mins",attrs:{href:"javascript:void(0)"},on:{click:function(s){return t.changeSkuNum("decrement",e)}}},[t._v("-")]),s("input",{staticClass:"itxt",attrs:{autocomplete:"off",type:"text"},domProps:{value:e.skuNum},on:{change:function(s){return t.changeSkuNum("input",e,s)}}}),s("a",{staticClass:"plus",attrs:{href:"javascript:void(0)"},on:{click:function(s){return t.changeSkuNum("increment",e)}}},[t._v("+")])]),s("li",{staticClass:"cart-list-con6"},[s("span",{staticClass:"sum"},[t._v("￥"+t._s(e.skuNum*e.cartPrice))])]),s("li",{staticClass:"cart-list-con7"},[s("a",{staticClass:"sindelet",attrs:{href:"#none"},on:{click:function(s){return t.deleteOne(e.skuId)}}},[t._v("删除")]),s("br")])])})),0)]),s("div",{staticClass:"cart-tool"},[s("div",{staticClass:"select-all"},[s("input",{staticClass:"chooseAll",attrs:{type:"checkbox"},domProps:{checked:t.isAll},on:{click:function(s){return s.preventDefault(),t.checkAll.apply(null,arguments)}}}),s("span",[t._v("全选")])]),s("div",{staticClass:"option"},[s("a",{attrs:{href:"#none"},on:{click:t.batchDelete}},[t._v("删除选中的商品")])]),s("div",{staticClass:"money-box"},[s("div",{staticClass:"chosed"},[t._v(" 已选择 "),s("span",[t._v(t._s(t.total))]),t._v("件商品 ")]),s("div",{staticClass:"sumprice"},[s("em",[t._v("总价（不含运费） ：")]),s("i",{staticClass:"summoney"},[t._v(t._s(t.totalPrice))])]),s("div",{staticClass:"sumbtn"},[s("router-link",{staticClass:"sum-btn",attrs:{to:"/trade"}},[t._v("结算")])],1)])])]):t._e(),t.cartInfoList.length?t._e():s("div",{staticClass:"empty"},[s("img",{attrs:{src:"http://49.232.112.44/img/empty.751bed26.gif",alt:""}}),s("h2",[t._v("购物车空空如也")])])])},c=[function(){var t=this,s=t._self._c;return s("div",{staticClass:"cart-th"},[s("div",{staticClass:"cart-th1"},[t._v("全部")]),s("div",{staticClass:"cart-th2"},[t._v("商品")]),s("div",{staticClass:"cart-th3"},[t._v("单价（元）")]),s("div",{staticClass:"cart-th4"},[t._v("数量")]),s("div",{staticClass:"cart-th5"},[t._v("小计（元）")]),s("div",{staticClass:"cart-th6"},[t._v("操作")])])}],i=(e(7658),e(5895)),r=e(8366),l={name:"ShopCart",data(){return{cartInfoList:[]}},computed:{isAll(){return this.cartInfoList.every((t=>t.isChecked))&&this.cartInfoList.length},total(){return this.cartInfoList.reduce(((t,s)=>t+(s.isChecked?s.skuNum:0)),0)},totalPrice(){return this.cartInfoList.reduce(((t,s)=>t+(s.isChecked?s.skuNum*s.skuPrice:0)),0)}},methods:{async getCartList(){let{code:t,data:s,message:e}=await(0,i.S3)();200===t?this.cartInfoList=s[0]?.cartInfoList||[]:alert(`获取购物车数据失败：${e}`)},async checkOne(t,s){let{checked:e}=s.target;e=e?1:0;let{code:a,message:c}=await(0,i.ZV)(t.skuId,e);200===a?t.isChecked=e:alert("勾选商品失败："+c)},async checkOne(t,s){let{checked:e}=s.target;e=e?1:0;let{code:a,message:c}=await(0,i.ZV)(t.skuId,e);200===a?t.isChecked=e:alert(`勾选商品失败：${c}`)},async checkAll(t){let{checked:s}=t.target;s=s?1:0;const e=[];this.cartInfoList.forEach((t=>e.push(t.skuId)));let{code:a,message:c}=await(0,i.i_)(e,s);200===a?this.cartInfoList.forEach((t=>t.isChecked=s)):alert(`勾选商品失败：${c}`)},async deleteOne(t){if(confirm("确定要删除吗？")){let{code:s,message:e}=await(0,i.BV)(t);if(200===s){let s=this.cartInfoList.findIndex((s=>s.skuId===t));this.cartInfoList.splice(s,1)}}else alert(`删除商品失败：${message}`)},async batchDelete(){if(confirm("确定要删除吗？")){const t=[];this.cartInfoList.forEach((s=>{s.isChecked&&t.push(s.isChecked)}));let{code:s,message:e}=await(0,i.cT)(t);200===s?this.cartInfoList=this.cartInfoList.filter((t=>!t.isChecked)):alert(`删除商品失败：${e}`)}},async changeSkuNum(t,s,e){if(this.isLock)return void console.log("锁定中。。。。");this.isLock=!0;const{skuId:a,skuNum:c}=s;switch(t){case"increment":if(200===c)alert("最大购买数量为200");else{let{code:t,message:e}=await(0,i.KW)(a,1);200===t?(s.skuNum+=1,s.isChecked=1):alert(`修改商品数量失败,${e}`)}break;case"decrement":if(1===c)alert("最小购买数量为1");else{let{code:t,message:e}=await(0,i.KW)(a,-1);200===t?(s.skuNum-=1,s.isChecked=1):alert(`修改商品数量失败,${e}`)}break;case"input":const{value:t}=e.target;if(r.Qz.test(t)){const r=t-c;let{code:l,message:n}=await(0,i.KW)(a,r);200===l?(s.skuNum=1*t,s.isChecked=1):(e.target.value=c,alert(`修改商品数量失败：${n}`))}else if(t>200){const t=200-c;let{code:r,message:l}=await(0,i.KW)(a,t);200===r?(s.skuNum=200,this.$forceUpdate()):(e.target.value=c,alert(`修改商品数量失败：${l}`))}else e.target.value=c;break}this.isLock=!1}},mounted(){this.getCartList()}},n=l,o=e(1001),u=(0,o.Z)(n,a,c,!1,null,"19e7cc34",null),h=u.exports}}]);
//# sourceMappingURL=698.2ff52a20.js.map
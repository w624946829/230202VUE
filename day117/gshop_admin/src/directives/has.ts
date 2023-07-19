
import { useUserInfoStore } from "@/stores/userInfo";
import { App } from "vue";
export default (app:App)=>{
    app.directive('has',{
        // 组件加载完毕的生命周期函数
        mounted(el,binding){
      
        
        const userInfoStore = useUserInfoStore()
        // 判断传入进来的标识在不在按钮名字标识数组中
        if(!userInfoStore.authBtnList.includes(binding.value)){
            // 删除元素
            el.parentNode?.removeChild(el)
        }
        }
    })
}
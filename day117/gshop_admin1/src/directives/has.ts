// 自定义指令
import {App} from 'vue'
import { useUserInfoStore } from '@/stores/userInfo'
export default (app:App) =>{
    // 指令的名字
    app.directive('has',{
        // 组件加载完毕的生命周期
        mounted(el,binding){
            const userInfoStore = useUserInfoStore()
            // 判断传入进来的标识在不在按钮名字表示数组中
            if(!userInfoStore.authBtnList.includes(binding.value)){
                // 如果不在就删除
                el.parentNode.removeChild(el)
            }
        }
    })
}
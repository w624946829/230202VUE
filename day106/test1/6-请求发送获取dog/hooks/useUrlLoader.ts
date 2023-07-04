import axios from "axios";
import {ref} from 'vue'
export default function useUrlLoader(url:string){
    // 加载中
    const loading = ref(true)
    // 数据结果
    const result = ref()
    // 错误信息
    const msgError = ref('')

    // 调用接口发送请求
    axios.get(url).then(res=>{
        loading.value = false
        result.value = res.data
    }).catch(err=>{
        loading.value = false
        msgError.value = err.message || '未知错误'

    })
    return { 
        loading,result,msgError
    }
}
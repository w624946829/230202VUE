import axios from 'axios'
import { ref } from 'vue'
export default function useUrlLoader<T>(url:string){
    // 加载的状态
    const loading = ref(true)
    // 数据结果
    const result = ref<T|null>(null)
    // 错误信息
    const msgError = ref('')
    // 调用接口发送请求
    axios.get(url).then(response=>{
        loading.value = false //改变状态
        result.value = response.data //保存数据
        console.log(result);
    }).catch(err=>{
        loading.value = false  //改变状态
        msgError.value = err.message || '未知错误' //保存错误信息
    })
    return{
        loading,
        result,
        msgError
    }
}
import axios from "axios";
import { ref } from 'vue'
export default function useUrlLoader<T>(url:string){
    const loading = ref(true)
    const result = ref<T|null>(null)
    const msgError = ref('')
    axios.get(url).then(res =>{
        loading.value = false
        result.value = res.data
        console.log(result);
        
    }).catch(err=>{
        loading.value = false
        msgError.value = err.message || '未知错误'
    })
    return {
        loading,
        result,
        msgError
    }
}
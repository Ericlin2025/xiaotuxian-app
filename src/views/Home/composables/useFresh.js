import { getFreshApi } from "@/apis/testAPI"
import {ref,onMounted} from 'vue'

export function useFresh(){
    const fs = ref({})
    const getFresh = async() =>{
        const res = await getFreshApi()
        console.log('获取新鲜好物成功',res)
        fs.value = res.result
        
    }
    onMounted(()=>getFresh())

    return fs
}
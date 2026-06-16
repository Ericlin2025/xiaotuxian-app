import { getBrandApi } from "@/apis/testAPI"
import {ref,onMounted} from 'vue'

export function useBrand(){
    const lt = ref({})
    const getBrand = async() =>{
        const res = await getBrandApi()
        console.log('获取品牌成功',res)
        lt.value = res.result
        
    }
    onMounted(()=>getBrand())

    return lt
}
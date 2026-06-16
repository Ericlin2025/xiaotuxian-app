import { getRecommandApi } from "@/apis/testAPI"
import {ref,onMounted} from 'vue'

export function useRecommand(){
    const rc = ref({})
    const getRecommand = async() =>{
        const res = await getRecommandApi()
        console.log('获取人气推荐成功',res)
        rc.value = res.result
        
    }
    onMounted(()=>getRecommand())

    return rc
}
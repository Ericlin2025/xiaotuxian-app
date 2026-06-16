import { getDetailApi } from "@/apis/testAPI";

import {ref,onMounted} from 'vue'
import { useRoute} from "vue-router";

export function useDetail(){
    const dt = ref({})
    const route = useRoute()
    const getDetail = async() =>{
        const res = await getDetailApi(route.params.id)
        console.log('获取商品详情成功',res)
        dt.value= res.result
    }
    onMounted(()=>getDetail())
    return dt
}
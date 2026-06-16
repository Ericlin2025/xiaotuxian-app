import { getSubCategoryApi } from "@/apis/testAPI";

import {ref,onMounted} from 'vue'
import { useRoute } from "vue-router";

export function useSubCategory(){
    const sc = ref({})
    const route = useRoute()
    const getSubCategory = async() =>{
        const res = await getSubCategoryApi(route.params.id)
        console.log('获取二级分类子产品成功',res)
        sc.value=res.result
    }
    onMounted(()=>getSubCategory())
    return sc
}
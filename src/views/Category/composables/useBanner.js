import {ref,onMounted} from 'vue'
import { getBannerApi } from '@/apis/testAPI'


export function useBanner(){
    const img = ref({})
    const getBanner = async() =>{
        const res = await getBannerApi()
        console.log('获取轮播图成功',res)
        img.value = res.result
        
    }
    onMounted(()=>getBanner())

    return{img}
}

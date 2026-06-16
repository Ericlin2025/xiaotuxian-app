import {ref,onMounted} from 'vue'
import { getCategoryApi1 } from "../../../apis/testAPI";
import { useRoute } from 'vue-router';

export function useCategory (){
    const route = useRoute()
    const clist = ref({})
    const getCategory = async()=>{
        const res = await getCategoryApi1(route.params.id)
        console.log('获取二级分类成功',res)
        clist.value = res.result
    }
    onMounted(()=>getCategory())
    return {clist}
}
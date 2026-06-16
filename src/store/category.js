
import { defineStore } from 'pinia'


import { getCategoryApi } from '@/apis/testAPI.js'
import {ref,onMounted,computed} from 'vue'

export const useCategoryStore = defineStore('counter', () => {

  //定义数据
  const count = ref(0)

  // getter定义
  const doubleCount = computed(() => count.value * 2)

  // 定义修改数据的方法(action 同步+异步)
  const increment=()=> {
    count.value++
  }

//定义用于接收接口返回的对象
const categoryList = ref({})

//定义异步action
const getCategory = async() =>{
  const res = await getCategoryApi()
  console.log('获取一级分类成功',res)
  // console.log(res.result)
  categoryList.value=res.result
  
  
 
}

  return { count, doubleCount, increment, categoryList , getCategory }
})

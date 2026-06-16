import { createApp } from 'vue'

//导入初始化样式
import '@/styles/common.scss'
import App from './App.vue'

//导入createPinia
import {createPinia} from 'pinia'
//创建Pinia实例
const pinia = createPinia()

//导入路由
import router from './router'

//导入elementPlus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// //导入观察视图是否进入视野内函数
// import { useIntersectionObserver } from '@vueuse/core'

//导入懒加载指令
import { imgLazyPlugin } from '@/directives/imgLazy'

//测试接口函数
// import { getCategory } from '@/apis/testAPI.js'
// getCategory().then(res=>{
//     console.log(res)
// })

const app = createApp(App)

app.use(router)

app.use(ElementPlus)

app.use(pinia)

app.mount('#app')

// 使用懒加载指令
app.use(imgLazyPlugin)

//自定义指令的定义位置不是很好，所以改为将其封装为插件后再用main.js注册

// //自定义全局指令img-lazy:图片懒加载(视图内存在图片时才加载)
// app.directive('img-lazy',{
//     //在组件挂载时执行
//     mounted(el,binding){

//         //el:绑定的那个元素:img
//         //binding：binding.value 指令等于号后面绑定的表达式值：图片的url

//         console.log(el,binding.value)
//         useIntersectionObserver(
//             el,
//             ([{isIntersecting}]) => {
//                 //判断视图内是否有该指令指向的目标(如果有isintersecting为true,否为false)
//                 console.log(isIntersecting)
//                 if(isIntersecting){
//                     //如果视图内存在目标，就把目标的src值赋为binding
//                     el.src=binding.value
//                 }
//             },
// )
//     }
// })
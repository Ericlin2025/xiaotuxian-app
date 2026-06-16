//axios基础封装
import axios from 'axios'

const httpInstance = axios.create({
    //设置基础地址
    baseURL:'http://pcapi-xiaotuxian-front-devtest.itheima.net',
    // headers: {
    //     'Content-Type': 'application/json'  // 确保是 JSON 格式
    // },
    //设置超时时间
    timeout:10000
})

// 设置拦截器

//axios请求拦截器
httpInstance.interceptors.request.use(config=>{
    return config
},e=>Promise.reject(e))




//axios响应式拦截器
httpInstance.interceptors.response.use(res=>res.data,e=>{
    return Promise.reject(e)
})

export default httpInstance
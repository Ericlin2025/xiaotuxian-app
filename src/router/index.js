import { createRouter,createWebHistory } from "vue-router";
import Layout from '@/views/Layout/index.vue'
import Login from '@/views/Login/index.vue'
import Category from '@/views/Category/index.vue'
import Home from '@/views/Home/index.vue'
import Order from '@/views/Order/index.vue'
import Member from '@/views/Member/index.vue'
import SubCategory from '@/views/subCategory/index.vue'
import Detail from '@/views/Detail/index.vue'
//创建路由实例
const router= createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes:[
        {
            path:'/',
            component:Layout,

            // 二级路由设置
            children:[
                {
                    path:'',
                    component:Home
                },
                {
                    path:'category/:id',
                    component:Category
                },
                {
                    path:'category/sub/:id',
                    component:SubCategory
                },
                {
                    path:'detail/:id',
                    component:Detail
                }
            ]
        },
        {
            path:'/login',
            component:Login
        },
        {
            path:'/order',
            component:Order
        },
        {
            path:'/member',
            component:Member
        }
    ],
    //定制路由滚动行为(路由发生变化是自动回到顶部)
    scrollBehavior(){
        return {top:0}
    }
})

export default router
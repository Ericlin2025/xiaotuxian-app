<script setup>
import { ArrowRight } from '@element-plus/icons-vue'
import { getCategoryApi1,getBannerApi } from '../../apis/testAPI';
import {ref,onMounted,onUpdated,onBeforeUpdate} from 'vue'

//导入函数用于获取路径里面的参数,以此来获取到二级接口所需的参数
import { useRoute } from 'vue-router';
import { get } from '@vueuse/core';

// 获取该钩子用于跟踪路由是否变化
import { onBeforeRouteUpdate } from 'vue-router';

// 导入封装后的业务函数
import { useBanner } from './composables/useBanner';
import { useCategory } from './composables/useCategory';
import { id } from 'element-plus/es/locales.mjs';
// const route= useRoute()

const {clist} = useCategory()
const {img }= useBanner()
// const getClist = async() =>{
//     const res = await getCategoryApi1(route.params.id)
//     console.log('获取二级分类成功',res)
//     clist.value = res.result
// }
// onMounted(()=>getClist)
onMounted(async()=>{
    // route.params.id用于获取路由后面的id，用于接口访问获取二级分类
    // const res = await getCategoryApi1(route.params.id)
    // const res1 = await getBannerApi()
    // console.log('获取二级分类成功',res)
    // console.log('获取轮播图成功',res1)
    // clist.value = res.result
    // img.value = res1.result
})

// onBeforeRouteUpdate((to)=>{
//     console.log('路由发生变化')
//     // to用于获取路由变化后的新路由
//     console.log(to)
//     const res =  getCategoryApi1(to.params.id)
//     img.value = res.result

// })
// onUpdated(async()=>{
//     const res = await getCategoryApi1(route.params.id)
//     console.log(res)
//     clist.value = res.result
// })

</script>

<template>
    <!-- 使用现成的返回顶部组件 -->
   <el-backtop :right="100" :bottom="100" /> 
  <div class="category">
        <!-- 使用现成的面包屑组件 -->
        <el-breadcrumb :separator-icon="ArrowRight">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item >{{ clist.name }}</el-breadcrumb-item>
            
        </el-breadcrumb>
        <!-- 使用现成的列表图组件 -->
         <div class="lbt" m="t-4">
                <!-- <span class="demonstration">Switch when indicator is clicked</span> -->
                <el-carousel trigger="click" height="500px">
                <el-carousel-item v-for="item in img" :key="item">
                    <h3 class="small justify-center" text="2xl">
                        <RouterLink to="">
                            <img :src="item.imgUrl" alt="">
                        </RouterLink>
                    </h3>
                </el-carousel-item>
                </el-carousel>
         </div>
         <div class="all" >
            <h1>全部分类</h1>
            <ul>
                <li v-for="item in clist.children">
                    <RouterLink :to="`/category/sub/${item.id}`">
                        <img v-img-lazy="item.picture">
                        <p>{{ item.name }}</p>
                    </RouterLink>
                </li>
            </ul>
         </div>
         <div class="children" v-for="item in clist.children">
            <h2>{{ item.name }}</h2>
            <div class="pt">
                <img v-img-lazy="item.picture">
                
                <ul>
                    <li v-for="gs in item.goods">
                        <RouterLink :to="`/detail/${gs.id}`">
                            <img v-img-lazy="gs.picture">
                            <h3>{{ gs.name}}</h3>
                            <p>简介：{{ gs.desc }}</p>
                            <span>￥{{ gs.price }}</span>
                        </RouterLink>
                    </li>
                </ul>
            </div>
         </div>
  </div>
</template>

<style scoped lang="scss">
$primary: #27ba9b;
$container: 1200px;

*{
    box-sizing: border-box;
}
.category{
    background-color: #fff;
    width: $container;
    margin: 0 auto;
    .lbt{
        width: $container;
        // position: absolute;
        // top: 0;
        margin: 50px auto;
        .el-carousel__item h3 {
        color: #475669;
        opacity: 0.75;
        line-height: 150px;
        margin: 0;
        text-align: center;
        }

        .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
        }

        .el-carousel__item:nth-child(2n + 1) {
        background-color: #d3dce6;
        }
    }
    .all{
        h1{
            text-align: center;
            color: $primary;
        }
        ul{
            width: $container;
            height: 270px;
            // border: 1px solid black;
            display: flex;
            justify-content: space-around;
            align-items: center;
            flex-wrap: wrap;
            li{
                list-style: none;
                
                a{
                    color: black;
                    text-decoration: none;
                    &:hover{
                    color: $primary;
                    }
                    p{
                    text-align: center;
                    }
                    img{
                        width: 120px;
                        height: 120px;
                        border: 1px solid rgb(221, 221, 221);
                        border-radius: 60px;
                    }
                }
                
            }
        }
    }
    .children{
        width: $container;
        margin-bottom: 100px;
        h2{
            color: $primary;
        }
        .pt{
            // border: 1px solid black;
            width: $container;
            display: flex;
            justify-content: space-between;
            align-items: center;
            img{
            width: 300px;
            height: 300px;
            border-radius: 150px;
            border: 1px solid rgb(221, 221, 221);
            }
            ul{
                // border: 1px solid black;
                // border: 1px solid rgb(221, 221, 221);
                width: 850px;
                height: 700px;
                display: flex;
                flex-wrap: wrap;
                justify-content: space-around;
                align-content: space-around;
                li{
                    // overflow: auto;
                    border-radius: 5px;
                    border: 1px solid rgb(221, 221, 221);
                    list-style: none;
                    width: 250px;
                    height: 330px;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-around;
                    align-items: center;
                    transition: all 1s;
                    a{
                        color: black;
                        text-decoration: none;
                        width: 250px;
                        height: 330px;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-around;
                        align-items: center;
                    }
                    &:hover{
                        transform: translate(-5px,-5px) scale(1.25);
                        box-shadow: 5px 5px rgb(88, 88, 88);
                    }
                    img{
                        width: 130px;
                        height: 130px;
                        
                    }
                    span{
                        color: red;
                    }
                }
            }
        }
        
    }
}

</style>

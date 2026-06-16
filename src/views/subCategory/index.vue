<script setup>
import { ArrowRight } from '@element-plus/icons-vue'
import { useSubCategory } from './composables/useSubCategory';
import {ref,onMounted} from 'vue'
const activeName = ref('first')

const sc = useSubCategory()
</script>








<template>

    <div class="subCategory">
         <!-- 使用现成的面包屑组件 -->
        <el-breadcrumb :separator-icon="ArrowRight">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: `/category/${sc.parentId}` }">{{ sc.parentName }}</el-breadcrumb-item>
            <el-breadcrumb-item >{{ sc.name }}</el-breadcrumb-item>
            
        </el-breadcrumb>
        <!-- 使用现成的标签页组件 -->
        <el-tabs class="sub" type="card" v-model="activeName">
            <el-tab-pane label="最新产品" name="first">
                <ul>
                    <li v-for="item in sc.goods">
                         <RouterLink :to="`/detail/${item.id}`">
                            <img :src="item.picture" alt="">
                            <h6>{{ item.name }}</h6>
                            <span>￥{{ item.price }}</span>
                         </RouterLink>
                    </li>
                </ul>
            </el-tab-pane>
            <el-tab-pane label="最高人气" name="second"></el-tab-pane>
            <el-tab-pane label="评论最多" name="third"></el-tab-pane>
            
        </el-tabs>
        <div>
            
        </div>
    </div>

</template>

<style scoped lang="scss">
$container:1200px;
$primary: #27ba9b;
    .subCategory{
        background-color: #fff;
        width: $container;
        margin: 0 auto;

        .sub{
            margin-top: 50px;

            ul{
                width: $container;
                height: 600px;
                display: flex;
                flex-wrap: wrap;
                justify-content: space-around;
                align-content: space-around;
                padding: 0;
                li{
                    list-style: none;
                    width: 250px;
                    height: 250px;
                    border: 1px solid rgb(221, 221, 221);
                    border-radius: 5px;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    align-items: center;
                    transition: all 1s;
                    overflow: hidden;
                    &:hover{
                        color: $primary;
                        transform: scale(1.15);
                    }
                    a{
                        color: #000;
                        text-decoration: none;
                        width: 250px;
                        height: 250px;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        align-items: center;
                    }
                    img{
                        width: 100px;
                        height: 100px;
                        transition: all 1s;
                        border-radius: 50px;
                        &:hover{
                        
                        transform: scale(1.15);
                    }
                    }
                    span{
                        color: red;
                    }
                }
            }
        }
    }

</style>
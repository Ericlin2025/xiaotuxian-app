<script setup>
import { useDetail } from './composables/useDetail';
import {ref,onMounted ,computed} from 'vue'
import { ArrowRight } from '@element-plus/icons-vue'
import LayoutFooter from '@/components/layoutFooter.vue'
const dt = useDetail()
// console.log(dt.value.categories[0].parent.name)

'use strict'
const srcList = computed(()=>dt.value.mainPictures)
const url = computed(()=>dt.value.mainPictures?.[0])
</script>


<template>
    <div class="detail">
        <!-- 使用现成的面包屑组件 -->
        <el-breadcrumb :separator-icon="ArrowRight">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>

            <!-- 错误原因：dt.categories ->undefined ->undefined[1]是非法操作，所以直接报错
             解决方法：
             可选链语法?
             v-if手动控制渲染时机，保证数据存在后渲染 -->

            <el-breadcrumb-item :to="{ path: `/category/${dt.categories?.[1].id}` }">
                {{ dt.categories?.[0].parent.name}}
            </el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: `/category/sub/${dt.categories?.[0].id}` }">
                {{dt.categories?.[0].name}}
            </el-breadcrumb-item>
            <el-breadcrumb-item >{{dt.name}}</el-breadcrumb-item>
            
        </el-breadcrumb>
          <div class="demo-image__preview">
            <h3>{{ dt.name }}</h3>
            <p>点击图片查看更多</p>
            <!-- 使用图片插件 -->
                <el-image
                style="width: 300px; height: 300px"
                :src="url"
                :zoom-rate="1.2"
                :max-scale="7"
                :min-scale="0.2"
                :preview-src-list="srcList"
                show-progress
                :initial-index="4"
                fit="cover"
                />
            </div>

            <h3>简介：{{ dt.desc }}</h3>

            <h4>商品详情：</h4>
            <ul class="det">
                
                <li v-for="item in dt.details?.properties">
                    <b>{{ item.name }}</b>:{{ item.value }}
                </li>
            </ul>
            <p class="price">￥<b> {{ dt.price }}</b>  <s>{{ dt.oldPrice }}</s></p>
            
            <h4>商品选择：</h4>
            <ul class="specs" v-for="item in dt.specs">
                <p>{{ item.name }}:</p>
                <li v-for="i in item.values">
                    <RouterLink to="">
                        <img :src="i.picture" alt="" v-if="i.picture?true:false">
                        <p><b>{{ i.name }}:</b>{{ i.desc }}</p>
                        <!-- <p>{{ item.desc }}</p> -->
                    </RouterLink>
                </li>
            </ul>

            <h4>已售数量：<b>{{ dt.salesCount }}</b></h4>

            <h4>评论数量：<b>{{ dt.commentCount }}</b></h4>

            <h4>类似商品：</h4>
            <ul class="simi">
                
                <li v-for="item in dt.similarProducts">
                    <RouterLink :to="{path:`/detail/${item.id}`}">
                    
                        <img :src="item.picture" alt="">
                        <p>{{ item.name }}</p>
                        <span>￥{{ item.price }}</span>
                    </RouterLink>
                </li>
            </ul>

            <h4>热销商品：</h4>
            <ul class="hot">
                
                <li v-for="item in dt.hotByDay">
                    <RouterLink :to="{path:`/detail/${item.id}`}">
                        <img :src="item.picture" alt="">
                        <p>{{ item.name }}</p>
                        <span>￥{{ item.price }}</span>
                    </RouterLink>
                </li>
            </ul>
        </div>
       
        
</template>

<style scoped lang="scss">
// @import '@/styles/common.scss'; 
// $container:1200px;
// $primary: #27ba9b;
// $border: 1px solid rgb(221, 221, 221);
// ul{
//     padding: 0;
// }
// li{
//     list-style: none;
// }

.detail{
    background: white;
    // border: 1px solid black;
    width: $container;
    margin: 0 auto;
    .demo-image__preview{
        width: 400px;
        margin: 50px auto;

        
    }
    h4{
        color: $primary;
        b{
            color: rgb(255, 134, 154);
        }
    }
    .price{
        
        b{
                color:red;
                font-size: 30px;
            }
    }
    .det{
       li{
        b{
            color: orange;
        }
       }
    }
    .specs{
        width: $container;
        // height: 700px;
        display: flex;
        // justify-content: space-around;
        align-items: center;
        flex-wrap: wrap;
        // border: $border;
        li{
            
            border: $border;
            border-radius: $br;
            transition: all 1s;
            a{
                display: block;
                width: 90px;
                height: 90px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                align-items: center;
                overflow: hidden;
                // align-items: center;
                img{
                    width: 50px;
                    height: 50px;
                }
            }
            &:hover{
                transform: scale(1.14);
            }
        }

    }
    .simi,
    .hot{
        
        width: $container;
        height: 400px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        li{
            width: 250px;
            height: 300px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            border:$border;
            border-radius: $br;
            transition: all 1s;
            &:hover{
                transform: scale(1.14);
            }
            a{
                // text-decoration: none;
                // color: black;
                width: 250px;
                height: 300px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                align-items: center;
                img{
                width: 150px;
                height: 150px;
                }
                span{
                    color: red;
                }
            }
            
            
    }
    }

}
</style>
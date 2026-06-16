<script setup>
import {ref, onMounted } from 'vue';
import {getBrandApi, getBannerApi,getFreshApi,getRecommandApi } from '../apis/testAPI';
import { useCategoryStore } from '../store/category';
import { storeToRefs } from 'pinia';

const categoryStore = useCategoryStore()
const {categoryList} =storeToRefs(categoryStore)

const img = ref({})
const fs = ref({})
const rc = ref({})
const lt = ref({})
// const gd = ref()
onMounted(async()=>{
//   categoryStore.getCategory()

  const res = await getBannerApi()
  console.log('获取轮播图成功',res.result)

  const res1 = await getFreshApi()
  console.log('获取新鲜好物成功',res1)

  const res2 = await getRecommandApi()
  console.log('获取人气推荐成功',res2)

    const res3 = await getBrandApi()
  console.log('获取品牌成功',res3)

//   const res4 = await getGoodsApi()
//   console.log('获取商品成功',res4)
  img.value=res.result
  fs.value=res1.result
  rc.value=res2.result
  lt.value = res3.result
})
</script>




<template>
    <el-backtop :right="100" :bottom="100" />
    <div class="layout-body" >
        <div class="banner">
            <!-- 左侧分类和banner -->
            <ul class="category">
                <li v-for="item in categoryList">
                    <RouterLink :to="`/category/${item.id}`"><b>{{ item.name }}</b>:{{ item.children[0].name }}...</RouterLink>
                </li>
            </ul>
            <!-- <div class="img" v-for="item in img">
                <a href="">
                    <img :src="item.imgUrl" alt="">
                </a>
            </div> -->
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
        </div>
        <div class="fresh">
            <h2>新鲜好物  <small>新鲜出炉，品质靠谱</small></h2>
            <div class="ct">
                <ul>
                    
                    <li v-for="item in fs">
                        <RouterLink :to="`/detail/${item.id}`">
                            <!-- <img :src="item.picture" alt=""> -->
                            <!-- 使用自定义的图片懒加载指令 -->
                         <img v-img-lazy="item.picture">
                            <h3>{{ item.name }}</h3>
                            <p>描述:{{item.desc}}</p>
                            <span>￥{{ item.price }}</span>
                        </RouterLink>
                    </li>
                </ul>
            </div>
        </div>
        <div class="recommand">
            <h2>人气推荐 <small>人气热门，精品推荐</small></h2>
            <div class="ct">
                <ul>
                    
                    <li v-for="item in rc">
                        <RouterLink :to="`/detail/${item.id}`">
                            <!-- <img :src="item.picture" alt=""> -->
                            <!-- 使用自定义的图片懒加载指令 -->
                         <img v-img-lazy="item.picture">
                            <h3>{{ item.title }}</h3>
                            <p>描述:{{item.alt}}</p>
                        </RouterLink>
                    </li>
                </ul>
            </div>
        </div>
        <div class="list">
            <h2>名牌列表  <small>奢侈名牌，铸就品质</small></h2>
            <div class="ct">
                <ul>
                    
                    <li v-for="item in lt">
                        <RouterLink to="">
                        <!-- <img :src="item.picture" alt=""> -->
                         <!-- 使用自定义的图片懒加载指令 -->
                         <img v-img-lazy="item.picture">
                        <h3>{{ item.nameEn }}</h3>
                        <p>品牌名称：{{ item.name }}</p>
                        </RouterLink>
                        
                    </li>
                </ul>
            </div>
        </div>
        <div v-for="item in categoryList" class="product">
            <h2>{{ item.name }}</h2>
            <ul>
                <li v-for="goods in item.goods">
                    <img v-img-lazy="goods.picture">
                    <div class="wz">
                        <p>{{ goods.desc }}</p>
                        <span>￥{{ goods.price }}</span>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped lang="scss">
$primary: #27ba9b;
$container: 1200px;
.layout-body{
 width: $container;
//  height: 3700px;
 margin: 0 auto;
 background-color: #ffffff;
}
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    text-decoration: none;
    list-style: none;
}

.banner{
    width: $container;
    height: 500px;
    // border: 1px solid black;
    // display: flex;
    position: relative;
    margin-bottom: 50px;
  

    .lbt{
        width: $container;
        position: absolute;
        top: 0;
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
    ul{
        margin: 0;
        width: 200px;
        height: 100%;
        // border: 1px solid black;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        background-color: rgba(77, 77, 77, 0.5);
        position: absolute;
        top: 0;
        z-index: 333;
        li{
            list-style: none;
            width: 200px;
            height: 40px;
            text-align: center;
            line-height: 40px;
            color: white;
            padding: 0;
            a{
                display: block;
                width: 200px;
                height: 40px;
                text-align: center;
                line-height: 40px;
                color: white;
                text-decoration: none;
                &:hover
                {
                color: $primary;
                background-color: rgba($color: #8b8b8b, $alpha: 0.6);
                }
            }
        }
    }
}
.fresh,
.recommand,
.list{
    width: $container;
    height: 800px;
    // border: 1px solid black;
    h2{
        color: $primary;
        small{
            color: #acacac;
        }
    }
    ul{
        width: $container;
        height: 700px;
        box-sizing: border-box;
        border: 1px solid rgb(221, 221, 221);
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        align-content: space-around;
        li{
            border-radius: 5px;
            width: 280px;
            height: 330px;
            border: 1px solid rgb(221, 221, 221);
            
            transition: all 1s;
            
            &:hover{
                transform: translate(-5px,-5px);
                box-shadow: 5px 5px rgb(88, 88, 88);
            }
            a{
                width: 280px;
                height: 330px;
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                align-items: center;
                color: black;
                overflow: hidden;
            }
            img{
                width: 180px;
                height: 180px;
                border-radius: 90px;
                transition: all 1s;
                &:hover{
                    transform: scale(1.15);
                }
            }
            p{
                text-align: center;
            }
            h3{
                text-align: center;

                
            }
            span{
                text-align: center;
                color: red;
            }
        }
    }
}
.list {
    height: 1600px;
   ul{
    height: 1500px;
   }
}
.product{
    width: $container;
    height: 900px;
    // border: 1px solid black;
    ul{
        width: $container;
        height: 800px;
        border: 1px solid rgb(221, 221, 221);
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        align-content: space-around;
        
        li{
            width: 350px;
            height: 200px;
            border: 1px solid rgb(221, 221, 221);
            display: flex;
            justify-content: space-around;
            align-items: center;
            overflow: hidden;
            transition: all 1s;
            border-radius: 5px;
            &:hover{
                transform: translate(-5px,-5px);
                box-shadow: 5px 5px rgb(88, 88, 88);
            }
            img{
                width: 150px;
                height: 150px;
                border-radius: 75px;
                transition: all 1s;
                &:hover{
                    transform: scale(1.34);
                }
            }
            .wz{
                width: 150px;
                height: 200px;
                display: flex;
                flex-direction: column;
                justify-content: space-around;

                span{
                    color: red;
                }
            }
        }
    }
}
</style>
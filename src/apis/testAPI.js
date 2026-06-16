import httpInstance from '@/utils/http.js'

//获取一级分类接口函数
export  function getCategoryApi (){
    return httpInstance({
        url:'home/category/head'
    })
}
//获取二级分类列表
export  function getCategoryListApi (){
    return httpInstance({
        url:'category'
    })
}

//短信登录
export function loginApi (data){
    return httpInstance({
        url:'login/code',
        method:'post',
        data:data
        
    })
}

//获取验证码
export function getCodeApi (num){
    return httpInstance({
        url:'login/code',
        params:{
            moblie:num
        }
    })
}

//获取品牌
export  function getBrandApi (){
    return httpInstance({
        url:'home/brand'
    })
}

//获取轮播图片
export  function getBannerApi (){
    return httpInstance({
        url:'home/banner',
        params:{
            distributionSite:'3'
        }
    })
}

//获取新鲜好物
export  function getFreshApi (){
    return httpInstance({
        url:'home/new',
        params:{
            limit:6
        }
    })
}

//获取人气推荐
export  function getRecommandApi (){
    return httpInstance({
        url:'home/hot'
    })
}

//获取商品列表推荐
export  function getGoodsApi (){
    return httpInstance({
        url:'home/goods'
    })
}

//获取二级分类
export  function getCategoryApi1 (id){
    return httpInstance({
        url:'category',
        params:{
            id:id
        }
    })
}

//获取二二级分类
export function getSubCategoryApi(id){
    return httpInstance({
        url:'category/sub/filter',
        params:{
            id
        }
    })
}

//获取商品详情
export function getDetailApi(id){
    return httpInstance({
        url:'goods',
        params:{
            id
        }
    })
}
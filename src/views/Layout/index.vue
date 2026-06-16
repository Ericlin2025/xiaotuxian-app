<script setup>
import LayoutNav from '@/components/layoutNav.vue'
import LayoutHeader from '@/components/layoutHeader.vue'
import LayoutFooter from '@/components/layoutFooter.vue'
import LayoutBody from '../../components/layoutBody.vue';

import LayoutHeaderFixed from '../../components/layoutHeaderFixed.vue';

import { useCategoryStore } from '../../store/category';
import { getBannerApi,getBrandApi,getCategoryListApi } from '../../apis/testAPI';
const categoryStore = useCategoryStore()

import { onMounted } from 'vue';
onMounted(async()=>{
  // const res1 = await getBannerApi()
  // console.log('获取轮播图成功',res1)
  // const res2 = await getBrandApi()
  // console.log('获取品牌成功',res2)
  // const res3 = await getCategoryListApi()
  // console.log('获取二级分类列表成功',res3)

  //获取分类
  categoryStore.getCategory()
})
</script>


<template>
  <div class="page-layout">
    <LayoutNav />
    <LayoutHeaderFixed/>
    <LayoutHeader />
    
    <!-- 二级路由出口 -->
    <!-- 添加:key,破坏复用机制,强制销毁重建 -->
    <!-- 每次路由发生变化，就重新挂载 -->
    <RouterView :key="$route.fullPath" />
    <!-- <RouterView /> -->
    <!-- <LayoutBody/> -->
    
    <LayoutFooter />
  </div>
</template>

<style scoped lang="scss">
.page-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f5f5f5;
}

.page-layout__main {
  flex: 1;
}
</style>
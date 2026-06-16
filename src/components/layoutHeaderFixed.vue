<script setup>
// import { getCategoryApi } from '@/apis/testAPI.js'
// import {ref,onMounted} from 'vue'


// import { useCounterStore } from '../store/category';
// import { storeToRefs } from 'pinia';



import { storeToRefs } from 'pinia';
import { useCategoryStore } from '../store/category';
const categoryStore = useCategoryStore()
const {categoryList} = storeToRefs(categoryStore)

//导入useScroll函数计算相对window滑动的距离，来确认是否显示该插件
import { useScroll } from '@vueuse/core'
const  {y} = useScroll(window)

// const couterStore= useCounterStore()
// const {categoryList} = storeToRefs(couterStore)
// const {getCategory} = couterStore
// onMounted(()=>{
//   getCategory()
// })

// const categoryList = ref([])
// const getCategory = async() =>{
//   const res = await getCategoryApi()
//   console.log(res.result)
//   categoryList.value=res.result
// }
// onMounted(()=>{
//   getCategory()
// })
</script>



<template>
    <!-- <div>{{ y }}</div> -->
  <header class="layout-header" v-show="y<160?false:true">
    <div class="layout-header__inner" >
      <RouterLink class="brand" to="/">
        <span class="brand__mark" aria-hidden="true">
          <svg viewBox="0 0 48 48" width="48" height="48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="24" cy="28" r="14" fill="#27ba9b" />
            <ellipse cx="18" cy="14" rx="6" ry="10" fill="#27ba9b" transform="rotate(-18 18 14)" />
            <ellipse cx="30" cy="14" rx="6" ry="10" fill="#27ba9b" transform="rotate(18 30 14)" />
            <circle cx="19" cy="26" r="2" fill="#fff" />
            <circle cx="29" cy="26" r="2" fill="#fff" />
            <ellipse cx="24" cy="32" rx="3" ry="2" fill="#fff" opacity="0.85" />
          </svg>
        </span>
        <span class="brand__text">
          <span class="brand__name">小兔鲜儿</span>
          <span class="brand__tag">新鲜 · 亲民 · 快捷</span>
        </span>
      </RouterLink>

      <nav class="main-nav" aria-label="主导航">
        <!-- <RouterLink to="/">首页</RouterLink>
        <a href="javascript:;">居家</a>
        <a href="javascript:;">美食</a>
        <a href="javascript:;">服饰</a> -->
        <ul>
          
          <!-- 首页要使用exact-active-class，如果使用active-class的话由于其他路由也有包括/，所以首页会一直触发 -->
          <li><RouterLink  to="/" exact-active-class="active">首页</RouterLink></li>
          <li v-for="item in categoryList" :key="item.id">
            <!-- RouterLink组件默认支持激活样式显示类名，给active-class设置对应类名即可 -->
            <RouterLink active-class="active" :to="`/category/${item.id }`">{{ item.name }}</RouterLink>
          </li>
        </ul>
      </nav>

      <div class="search">
        <input type="search" class="search__input" placeholder="搜一搜" aria-label="搜索" />
        <button type="button" class="search__btn" aria-label="提交搜索">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Zm0-2a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11Z"
              fill="#999"
            />
            <path d="M15.446 15.446 20.5 20.5" stroke="#999" stroke-width="2" stroke-linecap="round" />
          </svg>
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped lang="scss">
$primary: #27ba9b;
$container: 1200px;

li{
  list-style: none;
}
.layout-header {
  z-index: 999;
  width: 1200px;
  background-color:white;
  box-shadow: 0 1px 0 #f2f2f2;
  position: fixed;
  top: 0;
  left: 50%;
  transform:translate(-50%)
  
  
}

.layout-header__inner {
  max-width: $container;
  margin: 0 auto;
  padding: 18px 16px;
  display: flex;
  align-items: center;
  gap: 24px;
  flex-wrap: wrap;
}

.brand {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  color: inherit;
  margin-right: auto;
}

.brand__text {
  display: flex;
  flex-direction: column;
  gap: 4px;
  span{
    color: #000000;
}
  }



.brand__name {
  font-size: 26px;
  font-weight: 600;
  color: #666;
  letter-spacing: 0.02em;
}

.brand__tag {
  font-size: 12px;
  color: #999;
}

.main-nav {
  display: flex;
  align-items: center;
  gap: 28px;

  ul{
    width: 500px;
    display: flex;
    justify-content: space-between;
  }
  .active{
  color: $primary;
  border-bottom-color: $primary;
}
  a {
    font-size: 16px;
    color: #000000;
    text-decoration: none;
    border-bottom: 2px solid transparent;
    padding-bottom: 2px;

    &:hover
    {
      color: $primary;
      border-bottom-color: $primary;
    }
  }
}

.search {
  display: flex;
  align-items: stretch;
  border: 1px solid #e7e7e7;
  border-radius: 2px;
  overflow: hidden;
  min-width: 200px;
  margin-left: auto;
}

.search__input {
  flex: 1;
  border: none;
  padding: 8px 12px;
  font-size: 14px;
  outline: none;
  min-width: 0;

  &::placeholder {
    color: #ccc;
  }
}

.search__btn {
  border: none;
  background: #f5f5f5;
  padding: 0 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #eee;
  }
}

@media (max-width: 900px) {
  .layout-header__inner {
    justify-content: center;
  }

  .brand {
    margin-right: 0;
  }

  .search {
    width: 100%;
    margin-left: 0;
  }
}
</style>

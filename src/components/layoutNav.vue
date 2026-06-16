<template>
  <div class="layout-nav">
    <div class="layout-nav__inner">
      <ul class="layout-nav__links">
        
        <li><RouterLink to="/login">退出登录</RouterLink></li>
        <li class="sep" aria-hidden="true">|</li>
        <li><RouterLink to="/order">我的订单</RouterLink></li>
        <li class="sep" aria-hidden="true">|</li>
        <li><RouterLink to="/member">会员中心</RouterLink></li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">
$nav-bg: #333;
$nav-text: #cdcdcd;
$nav-hover: #27ba9b;
$container: 1200px;

.layout-nav {
  background: $nav-bg;
  font-size: 12px;
  line-height: 1;
  height: 65px;
  width: 100%;
  
  
}

.layout-nav__inner {
  max-width: $container;
  margin: 18px auto;
  padding: 10px 16px;
  display: flex;
  justify-content: flex-end;

}

.layout-nav__links {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0;
  list-style: none;
  margin: 0;
  padding: 0;

  a {
    color: $nav-text;
    text-decoration: none;
    padding: 4px 8px;

    &:hover {
      color: $nav-hover;
    }
  }

  .sep {
    color: #666;
    user-select: none;
    padding: 0 2px;
  }
}
</style>

# 小兔鲜儿电商平台

基于 **Vue 3 + Vite** 的前端电商练习项目，仿照「小兔鲜儿」生鲜电商站点，完成首页、分类、商品详情、登录等核心页面，并实践 Vue 3 组合式 API、路由、状态管理、接口封装等常用开发能力。

## 技术栈

| 类别 | 技术 |
|------|------|
| 框架 | Vue 3（Composition API + `<script setup>`） |
| 构建工具 | Vite 8 |
| 路由 | Vue Router 4 |
| 状态管理 | Pinia |
| HTTP 请求 | Axios |
| UI 组件库 | Element Plus（按需自动导入） |
| 样式 | SCSS |
| 工具库 | @vueuse/core |

## 功能模块

- **首页**：轮播图、新鲜好物、人气推荐、品牌展示
- **一级分类**：`/category/:id`，展示分类信息与商品列表
- **二级分类**：`/category/sub/:id`，子分类筛选与商品列表
- **商品详情**：`/detail/:id`，商品信息、图片预览、面包屑导航
- **用户登录**：手机号 + 短信验证码登录（`/login`）
- **订单 / 会员中心**：`/order`、`/member`（页面骨架）
- **公共布局**：顶部导航、固定头部、页脚
- **图片懒加载**：自定义指令 `v-img-lazy`，进入视口后再加载图片

## 项目结构

```
src/
├── apis/                  # 接口函数封装
│   └── testAPI.js
├── components/            # 公共布局组件
│   ├── layoutHeader.vue
│   ├── layoutHeaderFixed.vue
│   ├── layoutNav.vue
│   ├── layoutFooter.vue
│   └── layoutBody.vue
├── directives/            # 自定义指令
│   └── imgLazy.js         # 图片懒加载插件
├── router/                # 路由配置
│   └── index.js
├── store/                 # Pinia 状态
│   └── category.js        # 分类数据
├── styles/                # 全局样式
│   ├── common.scss
│   └── var.scss
├── utils/
│   └── http.js            # Axios 实例与拦截器
├── views/                 # 页面视图
│   ├── Layout/            # 主布局（嵌套路由出口）
│   ├── Home/              # 首页 + composables
│   ├── Category/          # 一级分类
│   ├── subCategory/       # 二级分类
│   ├── Detail/            # 商品详情
│   ├── Login/             # 登录
│   ├── Order/             # 订单
│   └── Member/            # 会员中心
├── App.vue
└── main.js
```

## 快速开始

### 环境要求

- Node.js >= 18
- npm / pnpm / yarn

### 安装依赖

```bash
npm install
```

### 本地开发

```bash
npm run dev
```

启动后访问终端输出的本地地址（一般为 `http://localhost:5173`）。

### 生产构建

```bash
npm run build
```

### 预览构建产物

```bash
npm run preview
```

## 路由说明

| 路径 | 页面 | 说明 |
|------|------|------|
| `/` | 首页 | 轮播、推荐、品牌等 |
| `/category/:id` | 一级分类 | 动态路由参数 `id` |
| `/category/sub/:id` | 二级分类 | 子分类筛选 |
| `/detail/:id` | 商品详情 | 根据商品 id 拉取详情 |
| `/login` | 登录 | 短信验证码登录 |
| `/order` | 订单 | 订单页 |
| `/member` | 会员中心 | 会员页 |

主布局使用嵌套路由，子页面在 `Layout` 组件内的 `<RouterView>` 渲染；切换路由时通过 `:key="$route.fullPath"` 强制重新挂载，避免组件复用导致数据不刷新。

## 接口说明

后端基础地址配置在 `src/utils/http.js`：

```
http://pcapi-xiaotuxian-front-devtest.itheima.net
```

主要接口（详见 `src/apis/testAPI.js`）：

| 接口 | 方法 | 路径 | 用途 |
|------|------|------|------|
| 一级分类 | GET | `/home/category/head` | 导航分类 |
| 分类列表 | GET | `/category` | 二级分类列表 |
| 轮播图 | GET | `/home/banner` | 首页轮播 |
| 新鲜好物 | GET | `/home/new` | 首页新品 |
| 人气推荐 | GET | `/home/hot` | 首页热门 |
| 品牌 | GET | `/home/brand` | 首页品牌 |
| 商品推荐 | GET | `/home/goods` | 首页商品 |
| 子分类筛选 | GET | `/category/sub/filter` | 二级分类页 |
| 商品详情 | GET | `/goods` | 详情页 |
| 获取验证码 | GET | `/login/code` | 登录验证码 |
| 短信登录 | POST | `/login/code` | 提交登录 |

> 说明：课程公共测试环境下，验证码接口可能返回 500；登录页可使用默认验证码 `123456` 进行调试。

## 核心实现

### Axios 封装

- 统一 `baseURL` 与超时时间
- 响应拦截器直接返回 `res.data`，页面层无需再取 `.data`

### Pinia 状态管理

- 使用 Setup Store 写法（`ref` + `computed` + 异步 action）
- 分类数据在布局层请求，各组件通过 `storeToRefs` 响应式读取

### Composables 逻辑复用

各页面将数据请求逻辑抽离为 composable，例如：

- `useBanner` — 轮播图
- `useFresh` — 新鲜好物
- `useRecommand` — 人气推荐
- `useBrand` — 品牌
- `useCategory` / `useSubCategory` — 分类数据
- `useDetail` — 商品详情

### 图片懒加载

基于 `@vueuse/core` 的 `useIntersectionObserver` 实现 `v-img-lazy` 指令，图片进入视口后再赋值 `src`，加载完成后停止监听，减少无效请求与内存占用。

### Element Plus 按需导入

通过 `unplugin-auto-import` 与 `unplugin-vue-components` 自动按需引入组件，减小打包体积。

## 学习要点总结

通过本项目可以掌握：

1. **Vue 3 组合式 API**：`ref`、`computed`、`onMounted`、`storeToRefs`
2. **Vue Router**：嵌套路由、动态路由、路由参数、滚动行为、组件复用与 `:key` 刷新
3. **Pinia**：Setup Store、异步 action、跨组件共享状态
4. **Axios**：实例封装、拦截器、API 层分离
5. **工程化**：Vite 别名、`@` 路径、SCSS 全局变量注入
6. **性能优化**：图片懒加载、UI 库按需导入
7. **代码组织**：Composables 抽离业务逻辑、布局组件拆分

## 请求示例

```javascript
// 获取商品详情
import { getDetailApi } from '@/apis/testAPI'

const res = await getDetailApi('3994572')
console.log(res.result) // 商品详情对象
```

```javascript
// 短信登录
import { loginApi } from '@/apis/testAPI'

const res = await loginApi({ mobile: '13111111111', code: '123456' })
console.log(res)
```

## 许可证

本项目为 Vue 3 学习练习项目，仅供个人学习使用。

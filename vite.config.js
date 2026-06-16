import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { pathToFileURL } from 'node:url'

// elementPlus按需导入
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

const scssGlobalsUrl = pathToFileURL(
  path.resolve(__dirname, 'src/styles/var.scss'),
).href

const injectScssGlobals = `@import "${scssGlobalsUrl}";\n`

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // ...
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // 这行配置了 @ 别名
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: injectScssGlobals,
      },
    },
  },
})

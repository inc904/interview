# Vite

## 什么是 Vite

Vite 是一个基于 ES 模块的 前端构建工具，与传统的构建工具（如 webpack）不同，vite 在开发模式下使用原生 ES 模块化。它通过服务端渲染（SSR）将源代码转换为浏览器可识别的模块，实现了快速的启动时间和开发体验。
相较于 webpack 等工具，vite 在开发阶段提供了更快的冷启动和热模块替换（HMR）

## vite 如何实现快速开发的？原理是什么？

- 使用原生 ES 模块化，无需预打包。
- 利用服务端渲染（ssr）,将源代码转换为浏览器可识别的模块。
- 在开发模式下，按需编译和提供模块，实现快速的冷启动和热模块替换（HMR）

## vite 配置

1. 配置文件 vite.config.js

```js
export
```

## rollup

rollup 打包特点：

1. 不会生成过多代码
2. 可以多模块化规范打包

### 配置

1. 配置文件 rollup.config.js

```js
module.exports = {
  input: './src/index.js',
  output: {
    dir,
    file,
    format, // required, 输出内容遵循哪个模块化规范
    name,
  },
  external: ['react'],
  plugins: [],
}
```

## vite 默认提供的优化

1. 基于 ESM 的按需加载

- 开发环境下使用原生 ESM，实现快速冷启动和按需编译
- 生产构建时同城 Rollup 打包，自动进行 tree-shaking （删除未使用的代码）

2. 代码压缩和资源优化

- 自动使用 terser 或者 esbuild 压缩 js 代码，@vitejs/plugin-legacy 可进一步压缩传统浏览器兼容代码
- css 代码自动压缩并拆分为独立文件（通过 build.cssCodeSplit 配置）
- 静态资源（如图片）自动生成哈西文件名，支持浏览器缓存

3. 预加载优化

- 自动为入口文件依赖的模块生成 <link rel="modulepreload"> ，加速关键资源加载

4. 异步模块加载

- 动态导出的模块会自动拆分为独立的 Chunk，实现按需加载

5. 依赖预构建 Dependency Pre-Building

- 开发阶段预构建 CommonJS、UMD 依赖为 ESM 格式，加速后续加载。

## 需要自动手动配置的优化

1. 代码分割策略优化
   通过 build。rollupOptions.output.manualChunks 手动拆分代码，例如分离第三方依赖：

```js
// vite.config.js
export default {
  build: {
    rollupOptions: {
      manualChunks: {
        vendor: ['react', 'react-dom'], // 手动指定公共模块
      },
    },
    external: ['react', 'react-dom'], // 不打包这些库，使用 CDN 引入
  },
}
```

2. 传统浏览器兼容：使用 @vitejs/plugin-legacy 插件生成传统浏览器的 polyfill 和备用代码

```js
import legacy from '@vitejs/plugin-legacy'
export default {
  plugins:{
    legacy:{
      targets:['default', 'not IE 11']
  }
}
```

3. 静态资源压缩：使用压缩插件 压缩图片
4. css 优化：使用 postcss 等优化 css
5. Gzip/Brotil 压缩

## vite 官网提出的构建优化（自动应用）

1. css 代码分割

- 默认开启，自动将 css 代码分割到独立的文件
- css 代码分割可以减少首屏加载时间，提高用户体验
- 单独为异步模块的 css 代码生成单独的文件

## pure-admin 提供的优化

- 使用 `cssnano` 去压缩 css
- 使用 `Autoprefixer` 添加浏览器前缀
- 第三方组件、工具库 尽可能的按需引入， 以便 tree-shaking
- gzip 、brotli 压缩 .br .gz
  - vbenjs: `vite-plugin-compression ` 配置
- cdn，` vite-plugin-cdn-import` 插件，在打包是将自定的 modules 替换成 cdn 链接，减少构建时间，提高生产环境页面加载速度

- optimizeDeps 配置， vite 会自动预构建依赖，减少构建时间，提高生产环境页面加载速度, .vite

- 生产环境 删除 console.log
  - `vite-plugin-remove-console`
- 资源分类打包
  vite 是基于 esbuild 和 rollup 构建的

  ```js
  export default defineConfig({
    build: {
      rollupOptions: {
        // 静态资源分类打包
        output: {
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
        },
      },
    },
  })
  ```

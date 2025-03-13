# webpack

webpack 是一个用于现代 Javascript 应用程序的 `静态模块打包工具`，用于将多个模块打包成一个文件，通常用于将多个 js 文件合并成一个文件，减少 http 请求次数，提高页面加载速度。

使用模块化规范开发后有两个要面临的问题：

- 浏览器兼容问题（模块化规范的支持性）
- 模块过多是的加载问题

于是希望有一款工具可以对代码进行打包，将多个模块打包成一个文件， 这样一来即解决了兼容性问题，又解决了模块过多时的加载问题。。

`构建工具`就起到这样一个作用，通过构建工具可以使用 ESM 规范编写的代码转换为旧的 JS 语法。这样就可以使所有的浏览器都可以运行我们的代码。

## 使用步骤

1. 初始化项目 `npm init -y`
2. 安装依赖 `npm i webpack webpack-cli -D`
   `webpack` 工具的核心模块
   `webpack-cli` 是一个命令行工具，command-line interface
3. 创建 src 目录，在 src 中编写源码。
4. 执行 `npx webpack`， 会在项目根目录下生成一个 dist 目录，里面有一个 main.js 文件，这个文件就是打包后的文件。

> src 目录下的是遵循前端开发规范的，src 以外的要用 node 规范 CommonJS

## 概念

### mode

告知 webpack 使用什么模式的内置优化，默认是 production 模式， production 模式下会压缩代码， development 模式下不会压缩代码。

- none
- development
- production

### 入口（entry）

入口是 webpack 打包项目的起点，即项目的入口文件。指示 webpack 从哪个文件开始打包。

默认值是 src 目录下的 index.js 文件，也可以自定义。
entry: string | string[] | EntryObject
入口可以是一个字符串，也可以是一个数组，也可以是一个对象，对象中可以包含多个入口，每个入口对应一个 chunk。

- 单个入口文件【最常见】: entry: string
- 多个传递数组: entry:['.src/file_1.js', 'src/file_2.js']
- 对象写法分别命名打包： entry:{ app: './src/app.js', admin: './src/admin.js' }; 对象的时候，会生成两个文件，app.js 和 admin.js

### output

默认值是 dist 目录下的 main.js 文件，也可以自定义。其他的文件默认放置在 './dist' 文件夹内

```js
const path = require('path')
module.exports = {
  entry: './src/index.js',
  output: {
    clean: true, // 清除 dist 文件夹
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
}
```

### loader

loader 是一个转换器，它允许 webpack 处理非 JavaScript 文件。loader 可以将任何类型的文件转换为 webpack 能够处理的有效模块，然后添加它们到依赖图中。

**babel**

使用 js 新特性的时候，需要考虑旧的浏览器的兼容性。采用折中的方案。依然使用新特性编写代码，但是代码编写完成后通过一些工具就新代码转换为旧代码。
抽象语法树 ast，流程：

- parse 解析 ast
- 转换 polyfill 新转换旧
- 生成代码

babel 就是这样的工具，可以将新的 js 语法转换为旧的语法。

```bash
npm install --save-dev babel-loader @babel/core @babel/preset-env
```

- babel-loader：连接 webpack 和 babel 的中间件
- @babel/core：babel 的转换核心
- @babel/preset-env：预设环境

```js
module.exports = {
  module: {
  rules: [
    {
      test: /\.m?js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    }
  ]
}

// package.json
{
  "browserslist": ["defaults"]
}
```

### plugin

插件用来为 webpack 扩展功能。解决 loader 无法实现的其他事情。

#### html-webpack-plugin

```js
const HTMLPlugin = require('html-webpack-plugin')
module.exports = {
  plugins: [
    new HTMLPlugin({
      // title: "Hello Webpack", //设置title
      template: './src/index.html', //模板，自动引入script脚本
    }),
  ],
}
```

### DLL plugin

优化工具，通过 预构建不常变化的第三方库代码，生成动态链接库（DLL），减少后续构建时间，提升开发效率。

### commonsChunkPlugin

主要用来提取第三方库和公共模块，避免首屏加载的 bundle 文件或者按需加载的 bundle 文件体积过大，从而导致加载时间过长。

#### devtool

devtool 是一个选项，用来生成 source map 文件，用来调试代码。

```js
devtool: 'source-map'
devtool: 'inline-source-map'
```

#### webpack-dev-server

开发服务器，使用 express 来启动一个本地 node 服务器，用来开发项目。

npm i -D webpack-dev-server

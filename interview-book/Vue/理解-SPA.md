## SPA

- SPA（single page application）单页面应用，默认情况下我们编写 vue、react 都只有一个 html 页面并且提供一个挂载点，最终打包后会在此页面中引入对应的资源。页面的渲染全部由 js 动态进行渲染。切换页面时候通过监听路由变化。渲染对应的页面 client side rendering，客户端渲染（CSR）。

- MPA（multi page application）多页面应用，多个 HTML 页面。每个页面都必须重新渲染，js、css 等相关资源（服务端返回完整的 html，同时数据也可以在后端进行获取一并“模板引擎”）。多页面应用跳转需要这也资源刷新。Server side rendering，服务端渲染（SSR）。

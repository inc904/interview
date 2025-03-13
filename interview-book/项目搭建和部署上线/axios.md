# axios 配置

`axios` 是一个基于 `promise` 的 HTTP 库，可以用在浏览器和 node.js 中。

## axios 特点：

- 基于 `promise` 的异步 `ajax` 请求库，支持 Promise API
- 浏览器端和 node.js 端都支持，浏览器中端使用 `XMLHttpRequest`，node.js 端使用 http
- 支持请求和响应的拦截器
- 支持请求的取消
- 可以转换请求数据和响应数据，并将响应回来的内容自动转换成 JSON 格式
- 批量发送多个请求
- 安全性更高，客户端支持 `XSRF` 防御，就是让你的每一个请求都带一个从 `cookie` 中拿到的 `token` 值，根据浏览器同源策略，假冒的网站拿不到你 `cookie` 中的 `token` 值，所以服务器可以根据这个 `token` 值来判断是否是假冒的网站发过来的请求。

## 全局修改 axios 的默认配置

```js
axios.defaults.baseURL = 'https://api.example.com'
axios.defaults.headers.common['Authorization'] = AUTH_TOKEN
axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded'
```

## 配置的优先级

request config > instance。defaults > 系统默认配置

```js
// 创建一个实例，现在超时时间为 0s
var instance = axios.create()
// 通过 instance.default 修改默认值，优先级比默认值高， 超时时间设置为2.5秒
instance.defaults.timeout = 2500
// 通过 request config 重新设置超时时间 5s， 优先级比 instance.defaults 和系统默认都高
instance.get('/longRequest', {
  timeout: 5000,
})
```

TODO: 登录 token 注入，响应错误统一判断，请求响应解密验签，这些搞定 axios 就毕业了

```js

https://study.duyiedu.com/api/herolist

'/api/user/exists' get parmas:{loginID: 'abc'}

'/api/user/reg'  post {loginID: 'abc', password: '1232323',nickname:'Jacky'}
```

## 配置详解

```js
// 创建一个axios实例，可以直接传入配置对象，也可以后续在实例上添加
import axios from axios
const service = axios.create({
    baseURL: '/api',
    timeout: 5000,
    headers: {'X-Custom-Header': 'foobar'}
})
// 配置请求拦截器
service.interceptors.request.use(
    config => {
        // 在发送请求之前做些什么
        return config;
    },
    error => {
        // 对请求错误做些什么
        return Promise.reject(error);
    }
)
// 配置响应拦截器
service.interceptors.response.use(
    response => {
        // 2xx 范围内的状态码都会触发该函数。
        // 对响应数据做些什么
        return response;
    },
    error => {
        // 超出 2xx 范围的状态码都会触发该函数。
        // 对响应错误做些什么
        return Promise.reject(error);
    }
)
```

## 取消一个请求

1. 使用 CancelToken (deprecated)

   axios 提供了 CancelToken 类来创建取消标记。取消标记实际上是一个包含 cancel 方法对象。

   ```js
   import axios from 'axios'
   // 创建一个取消标记
   const source = axios.CancelToken.source()
   // 发送请求， 并关联取消标记
   axios
     .get('/user/12345', {
       // 关联取消标记
       cancelToken: source.token,
     })
     .then((response) => {
       // 处理成功的响应
     })
     .catch(function (err) {
       if (axios.isCancel(err)) {
         console.log('请求被取消', err.message)
       } else {
         // handle error
         console.log('处理错误', err.message)
       }
     })

   // 取消请求
   source.cancel('请求取消的原因')
   ```

2. 使用 AbortController

   从 v0.22.0 开始，Axios 支持以 fetch API 方式—— AbortController 取消请求：

   ```js
   const controller = new AbortController()
   // 发送请求， 并关联取消标记
   axios
     .get('/user/12345', {
       // 关联取消标记
       signal: controller.signal,
     })
     .then((response) => {
       // 处理成功的响应
     })

   // 取消请求
   controller.abort()
   ```

```ts
import type { AxiosRequestConfig } from 'axios'

const pendingMap = new Map()

const getPendingUrl = (config: AxiosRequestConfig): string => {
  return [config.method, config.url].join('&')
}

export class AxiosCanceler {
  addPending(config: AxiosRequestConfig) {
    this.removePending(config)
    const url = getPendingUrl(config)
    const controller = new AbortController()
    config.signal = controller.signal
    if (!pendingMap.has(url)) {
      pendingMap.set(url, controller)
    }
  }
  removePending(config: AxiosRequestConfig) {
    const url = getPendingUrl(config)
    if (pendingMap.has(url)) {
      const abortController = pendingMap.get(url)
      if (abortController) abortController.abort()
      pendingMap.delete(url)
    }
  }
  removeAllPending() {
    pendingMap.forEach((controller) => {
      controller.abort()
      this.reset()
    })
  }
  reset() {
    pendingMap.clear()
  }
}
```

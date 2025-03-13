```js
let url =
  'https://www.baidu.com/s?wd=js&ie=utf-8&f=8&rsv_bp=1&rsv_idx=2&tn=baiduhome_pg&rsv_spt=3&rsv_iqid=&rsv_t=a0f%2Fb%2F%2B%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2'

function getUrlParam(url, name) {
  let urlParam = url.split('?')[1]
  let urlSearch = new URLSearchParams(urlParam)
  // value = urlSearch.get(name) // 可以直接获取
  const params = Object.fromEntries(urlSearch.entries()) // 转成对象
  return params[name]
}
```

# Promise

Promise 是一个构造函数，用于封装异步操作，并返回一个 Promise 对象。Promise 对象有三种状态：

- pending（进行中）
- fulfilled（已完成）
- rejected（已拒绝）。

```js
new Promise((resolve, reject) => {
  setTimeout(() => {
    Math.random() > 0.5 ? resolve('成功') : reject('失败')
  })
})
  .then((result) => {
    console.log(result)
  })
  .catch((error) => {
    console.log(error)
  })
```

1. 特性：

- 可以链式调用： 通过 then 方法返回新的 Promise 实现链式调用
- 状态不可变， 一旦 resolve 或 reject 后，状态就凝固了，不会再改变。
- 错误冒泡：未捕获的错误会冒泡到最外层，并触发全局的 error 事件。

2. 静态方法：

- Promise.all()： 接收一个数组，数组中的所有 Promise 都成功时，才返回成功；返回数组结果，一个被拒绝则所有的被拒绝
- Promise.race()： 接收一个数组，数组中的任意一个 Promise 成功时，就返回成功；
  Promise.allSettled()： 接收一个数组，数组中的所有 Promise 都完成时，才返回成功；所有的都会返回，返回每一个的结果
- Promise.any ()： 接收一个数组，返回第一个成功的 promise 结果

3. 实际场景

- 处理多个并行的 api 请求
- 封装原生异步操作（如 ajax）
- 实现异步流程控制

generator 函数：
需要手动控制流程

```js
// Generator结合Promise示例
function* fetchData() {
  const data1 = yield ajax(url1)
  const data2 = yield ajax(url2)
  const data3 = yield ajax(url3)
  return data3
}

const iterator = fetchData()
iterator
  .next()
  .value.then((data1) =>
    iterator
      .next(data1)
      .value.then((data2) =>
        iterator.next(data2).value.then((data3) => iterator.next(data3))
      )
  )
```

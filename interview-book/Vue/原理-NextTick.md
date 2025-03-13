# NextTick

> 在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。

vue 在更新 DOM 时时异步执行的。当数据发生变化，vue 将开启一个异步更新队列。视图中需要等待队列中所有数据变化完成之后，在同一进行更新。

- 数据变化，vue 不会立即更新 DOM，而是将修改数据的操作放在了一个异步操作队列中
- 如果一直修改相同的数据，异步操作队列还会去重

## 为什么要有 nextTick 呢？

```js
// {{num}}
for (let i = 0; i < 100000; i++) {
  num = i
}
```

如果没有 nextTick 更新机制，那么在 for 循环中，num 每次的值更新都会触发视图更新（上面的代码更新了十万次 dom），有了 nextTick 机制，只需要更新一次，所以 nextTick 本质是一种优化策略

## 使用场景

想要在修改数据后立即得到更新后的 DOM 结构，可以使用 nextTick

## 实现原理

1. 把回调函数放入到 callbacks 数组中，等待执行
2. 将执行函数放到微任务或者宏任务中
3. 事件循环到了微任务或者宏任务，执行函数，执行 callbacks 数组中的回调函数

宽泛的理解为将回调函数放到 setTimeout 中执行，不过 nextTick 有限放入微任务执行，而 setTimeout 是宏任务，因此 nextTick 一半情况下总是先于 setTimeout 执行。

```js
setTimeout(() => {
  console.log(1)
}, 0)
this.$nextTick(() => {
  console.log(2)
})
this.$nextTick(() => {
  console.log(3)
})
//运行结果 2 3 1
// 猜想： 当前宏任务执行完毕后，优先执行两个微任务，最后在执行宏任务
```

总结：

nextTick 中维护了一个 callbacks 队列，一个 pending 锁，一个 timeFunc

- callbacks 队列的作用是收集当前正在执行的宏任务中所有 nextTick 回调函数，等当前会任务执行完之后，再依次执行队列中的回调函数
- 如果没有 callbacks 队列，那么 nextTick 就相当于 创建一个微任务，会直接执行回调函数，就不需要 pending 锁了

- 现在有了 callbacks 队列。就只需要创建一个 timeFunc 微任务，那么什么时候创建该微任务呢？
- 到 pending 了，在 pending 为 false 的时候，表示第一次添加 cb 到 callbacks 队列，那么就创建一个微任务， 并加锁
- 后面调用 nextTick 就只是往 callbacks 添加回调函数
- 等当前宏任务执行完后，就会执行 timeFunc ， 清空 callbacks 队列，并把 pending 设置为 false，一切归零

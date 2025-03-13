## this 的理解

### 谁问的

- 富途

### 回答

this 指向调用它的对象，也就是当前上下文。
具体指向哪个对象取决于他的调用方式：

1. 默认调用
   test() 指向 window
2. 对象的属性函数调用
   obj.sayHello() this 指向 obj
3. 通过 call、bind、apply 调用 显示的指向某个对象
4. new 绑定
   new Test() this 指向 Test, 构造函数 实例化的时候，指向实例对象
5. 箭头函数 没有 this，this 在定义的时候就确定了，他的外层函数的 this
6. 回调函数 被取出来单独调用的时候，this 指向 window
   避免这种情况可以 使用箭头函数或者 bind()方法
7. 事件绑定 this，指向调用他的对象，
   btn.addEventListener('click', function() {})
8. 类中的 this 指向实例对象， 但是如果把函数单独拿出来调用，this 指向 window， react 中 bind 绑定 this

## 节流和防抖

都是优化高执行频率代码的手段。为了优化体验和减小服务器压力，希望对调用次数进行限制。

节流： 相当于 LOL 中的技能 CD，n 秒内只运行一次，若后面重复触发，都不生效，等待下一个周期才能触发。

防抖： 相当于 LOL 中的回城，回城的过程中抖动，会取消回城。n 秒内重复触发的话，则重新计时。

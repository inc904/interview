# this 的理解

## 1.this 的概念

this 是 js 的一个关键字，它指向当前执行上下文的对象。具体指向哪个对象，取决于函数的调用方式。this 的值在函数被调用时确定，而不是在函数定义时确定。

## 2. this 的绑定规则

### 2.1 默认绑定

当函数独立调用时（即没有明确的调用对象），this 默认指向全局对象（在浏览器中时 window， 在 node.js 中时 global）。在严格模式下，this 为 undefined。

```javascript
function foo() {
  console.log(this)
}
foo() // 在浏览器中为 window，在 node.js 中为 global
```

### 2.2 隐式绑定

当函数被某个对象调用时，this 默认指向该对象。

```javascript
const obj = {
  name: 'Alice',
  foo() {
    console.log(this.name)
  },
  bar: () => {
    console.log(this.name)
  },
}
obj.foo() // Alice
obj.bar() // ''
```

### 2.3 显示绑定

通过 call、apply、bind 等方法，可以显式指定 this 的指向。

- call、apply 方法:立即执行函数，并指定函数的 this 值。
- bind 方法:返回一个新函数，新函数的 this 值被指定为 bind 方法的第一个参数。

```js
function greet() {
  console.log(`hello, ${this.name}`)
}
const alice = { name: 'Alice' }
const bob = { name: 'Bob' }
// 在 alice 上调用 greet 方法，this 值指向 alice
greet.call(alice) // hello, Alice
// 在 bob 上调用 greet 方法，this 值指向 bob
greet.apply(bob) // hello, Bob

// 在 greet 上调用 bind 方法，返回一个新的函数，新函数的 this 值被指定为 alice
const greetAlice = greet.bind(alice)
greetAlice() // hello, Alice
```

### 2.4 new 绑定

当函数被 new 操作符调用时，this 默认指向该函数的实例。

```js
function Person(name) {
  this.name = name
}
const alice = new Person('Alice')
console.log(alice.name) // Alice
```

### 2.5 箭头函数中的 this

箭头函数没有自己的 this，它会捕获外层函数的 this 值。剪头函数的 this 在定义时确定，而不是在运行时确定。
不能用作构造函数

- 没有 Prototype 属性 没有 argument 对象，不支持 call，apply

```js
const obj = {
  name: 'Alice',
  greet: function () {
    setTimeout(() => {
      console.log(`hello, ${this.name}`)
    }， 100)
  },
}
obj.greet() // hello, Alice
```

## 3. this 的特殊情况

### 3.1 回调函数中的 this

在回调函数中，this 的值可能会丢失，尤其是在使用 setTimeout、setInterval、Promise 等异步函数时。

```js
const obj = {
  name: 'Alice',
  greet: function () {
    // 这里
    setTimeout(function () {
      console.log(`hello, ${this.name}`)
    }， 100)
  },
}
obj.greet() // hello, undefined （this 指向window， 而 window 上没有 name 属性）
```

解决方法： 使用箭头函数或者 bind 方法。

```js
const obj = {
  name: 'Alice',
  greet: function () {
    setTimeout(() => {
      console.log(`hello, ${this.name}`)
    })
  },
}
obj.greet() // hello, Alice
```

### 3.2 事件处理函数中的 this

在 DOM 事件处理函数中，this 通常指向触发事件的元素

```js
const btn = document.getElementById('btn')
btn.addEventListener('click', function () {
  console.log(this) // this 指向 btn 元素
})
```

### 3.3 类中的 this

在类的方法中，this 指向类的实例。单如果将类的方法单独提取出来使用，可能会丢失 this 的指向。

```js
class Person {
  constructor(name) {
    this.name = name
  }
  greet() {
    console.log(`hello, ${this.name}`)
  }
}
const alice = new Person('Alice')
alice.greet() // hello, Alice

const greet = alice.greet
greet() // hello, undefined （this 指向window， 而 window 上没有 name 属性）
```

解决方法： 使用 bind 方法。

```js
class Person {
  constructor(name) {
    this.name = name
    this.greet = this.greet.bind(this)
  }
  greet() {
    console.log(`hello, ${this.name}`)
  }
}
```

### 0. 历史

1995 年 JavaScript 诞生时，最初像 Java 一样，只设置了 `null` 作为表示 “无” 的值，根据 C 语言的传统，`null` 被设计为 可以自动 转换为 0。

但是 JavaScript 的设计者，觉得这样还是不够，主要有以下两种原因。

1. `null` 像在 Java 中一样，被当成一个对象。但是在 JavaScript 中，数据类型被分为原始类型（primitive）和合成类型（complex）两大类，作者觉得表示“无”的值最好不是一个对象。
2. JavaScript 最初版本没有包括错误处理机制，发生数据类型不匹配的时候，往往是自动转换类型或者默默地失败。作者觉得，如果 `null` 自动转为 0 ，很不容易发现错误。

因此，作者有设计了一个 `undefined`。

在 JavaScript 中，`undefined` 和 `null` 都表示“无”或“空”的概念，但它们有以下区别：

### 1. 定义

- **`undefined`**：表示变量已声明但未赋值，或函数未明确返回值时默认返回的值。
- **`null`**：表示一个明确的空值，通常由开发者手动设置。

### 2. 类型

- **`undefined`**：类型为 `undefined`。
- **`null`**：类型为 `object`（这是 JavaScript 的历史遗留问题）。

### 3. 使用场景

- **`undefined`**：
  - 变量声明后未赋值。
  - 函数未返回值时。
  - 访问对象不存在的属性。
- **`null`**：
  - 开发者明确表示变量为空。
  - 作为对象属性的占位符。

### 4. 示例

```javascript
let a;
console.log(a); // undefined

let b = null;
console.log(b); // null

function foo() {}
console.log(foo()); // undefined

let obj = { key: null };
console.log(obj.key); // null
console.log(obj.nonExistentKey); // undefined

console.log(1 + null) // 1
console.log(1 + undefined) // NaN
```

### 5. 比较

- **宽松相等（`==`）**：`undefined` 和 `null` 相等。
- **严格相等（`===`）**：`undefined` 和 `null` 不相等。

```javascript
console.log(undefined == null);  // true
console.log(undefined === null); // false
```

### 总结

- **`undefined`**：表示未定义或未赋值。
- **`null`**：表示明确为空。

理解它们的区别有助于更好地处理变量和对象的状态。

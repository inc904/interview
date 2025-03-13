# js 超过 Number 最大值的数怎么处理？

`Number.MAX_VALUE`

## 背景

- 大数据的计算题

- 格式展示

- 用户输入

大数据做处理

- 金融
- 科学计算
- 数据分析

## 解决方案

### BigInt

在 JavaScript 中，可以使用 BigInt 来表示大于 Number 的最大值。以下是一个简单的示例：

```javascript
let bigInt = 9007199254740991n // 2^53 - 1
let bigNumber = BigInt(9007199254740991)
```

### Decimal.js

### Big.js

## 总结

1. bigint 来处理大数据
2. 第三份库 decimal.js / big.js 来处理精度问题
3. 格式化成好阅读的的格式： KMBT 计数法
4. 输入时 进行表单校验，进行格式的限制

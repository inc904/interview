## ES6 数组新增的扩展

1. 扩展运算符 `...`
2. `Array.from()` 将类数组转换为数组 `Array.of(1,3,1)` 转换为数组
3. find 找到第一个符合的元素， findIndex 找到第一个符合元素的索引
4. fill 填充数组
5. entries(), keys(), values()
6. includes() 判断数组中是否包含某个元素

## 对象新增的扩展

1. 属性的简写, 方法的简写
   ```js
   let name = 'zhangsan'
   let obj = {
     name,
   }
   methods：() => {}
   methods(){} // 简写的方法不能 当成构造函数使用
   ```
2. 属性名可以用表达式 `[name]`
3. super 指向当前对象，替代 this
4. 扩展运算符， 展开 对象， 浅拷贝
5. Object.assing() 合并对象， 浅拷贝

## 函数

1. 参数默认值，定义函数的时候，参数可以设置默认值，如果调用的时候没有传递参数，就会使用默认值
2. 箭头函数

## 数据结构

1. set 类似于数组，但是成员都是唯一的，没有重复的值， add，delete，has， clear

2. map 键值对的也许列表，而且键值都可以是任意类型

3. weakSet
4. weakMap
   进行 DOM 操作的时候，可以用 weakMap 去存，当 DOM 被清除的时候，对应的 weakMap 也会被清除

## Promise

- pending
- fulfilled
- rejected

1. Promise.all()
   都变成 fulfilled ，整体才会变成 fulfilled， 如果一个被 rejected， 整体就会变成 rejected

2. Promise.race()
   竞速，其中一个有响应就会返回状态
3. Promise.allSettled()
   返回一个 Promise 数组，每个 Promise 都会变成 fulfilled
   返回所有的结果

// 实现 unshit

// let arr = [1, 2, 3]

Array.prototype.unshift = function (...args) {
  for (let i = this.length - 1; i >= 0; i--) {
    this[i + args.length] = this[i]
  }
  for (let i = 0; i < args.length; i++) {
    this[i] = args[i]
  }
  return this.length
}

Array.prototype.myShift = function () {
  for (let i = 0; i < this.length; i++) {
    this[i] = this[i + 1]
  }
  this.length--
  return this.length
}

// console.log(arr.unshift(4, 5, 6))
// console.log(arr.myShift())
// console.log(arr)

// 数组去重
let arr = [1, 2, 3, 4, 5, {}, null, undefined, 9, 10, 1, 2, 8, 9, NaN, NaN, 10]

/**
 1. 如何获取指定范围内的随机数
 2. 打印 100 以内的质数
 3. 如何提取 URL 参数
 4. 数组的随机排序
 5. 使用迭代的方法实现 flatten 的函数
 6. 两数之和
 7. 给 abc 三个请求，希望c 在 ab 之后执行
 8. 手动实现发布订阅
 9. 导致页面加载白屏时间长的原因
 10. ES6 模块与 commonJS 模块的差异
 11. 深浅拷贝的区别
 12. 
 */

const arr1 = [11, 23, 3]
for (const key in arr1) {
  console.log(key)
}

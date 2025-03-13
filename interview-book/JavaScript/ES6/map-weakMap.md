常用的对象 Object， 是由 key: value 集合组成的，但是 key 只能是 字符串或者 Symbol，有很大的限制。
当需要其他类型的数据（函数、对象、基本类型）作为 key 值时，就需要用到数据结构 Map，他支持把各种类型的值 ，当做 键。
let map = new Map()
let zhangsan = {name: '奇奇怪怪的人'}
let lisi = {name: '花里胡哨的人'}
map.set(zhangsan, lisi)
map.set(lisi, zhangsan)
console.log(map.get(zhangsan))
console.log(map.get(lisi))

● Map 的键值是有序的，而添加到对象中的键则不是，因此对它进行遍历时，Map 对象是按照插入的顺序返回键值。
● 可以通过 size 属性直接获取一个 Map 的键值对 个数，而 Object 的键值对个数只能手动计算。
● Map 是可迭代的，而 Object 的 迭代需要先获取他的键数组然后进行迭代。
● Object 都有自己的原型，所以原型上的键名有可能和对象上的键名产生冲突。虽然 ES5 开始可以用 obj = Object.create(null) 来创建一个没有原型的对象，但是这种方法不太常见。
● Map 在频繁增删键值对的场景下有些性能优势。

Map 除了 set、get 方法，来设置和获取成员信息， 还有其他的属性和方法。
map.size // 2 map 中的成员数量
map.has(zhangsan) // true 布尔值 成员存在
map.delete(zhangsan) // true 布尔值 删除成功
map.clear() // 清楚所有成员，没有返回值
除了使用 set 方法给 Map 添加成员，也 可以通过接收参数的方式 添加成员
var map = new Map([
[zhangsan, lisi],
[lisi,zhangsan]
])
WeakMap 和 Map 类似，但是有几点区别：

1. WeakMap 只接受对象作为 key，如果设置其他类型作为 key，会报错
2. WeakMap 的 key 所引用的对象都是 弱引用，只要对象的其他引用被删除，垃圾回收机制就会释放该对象占用的内存，从而避免内存泄露
3. 由于 WeakMap 的成员 随时 可能 被垃圾会是机制回收，成员的数量 不稳定，所以没有 size 属性
4. 没有 clear 方法
5. 不能遍历

## vue2 中直接添加属性

现象：

通过代码给 data 中 添加新属性，随后打印属性，可以看到数据更新了，但是页面中的内容没有更新。

原因：

vue2 是使用 Object.defineProperty() 实现数据响应式，只能对已有属性进行监听，所以添加的属性无法响应式。

vue3 是用过 proxy 实现数据响应式的，直接动态添加新属性仍可以实现数据响应式

## 解决

vue 不允许在已经创建的实例上动态添加新的响应式属性。

若要想实现数据和视图同步更新，采取一下手段：

- Vue.set() / vm.$set(obj, key, value)

- Object.assign()
  直接使用 Object.assign()添加到对象的新属性不会触发更新

  应创建一个新的对象，合并原对象和混入对象的属性

  ```js
  this.items = Object.assign({}, this.items, { new: '123' })
  ```

- $forceUpdate() 强制重新渲染组件

## 不能检测到以下方式触发的数组变动：

- 利用索引直接设置一个数组项：vm.items[index] = newValue
- 修改数组的长度： vm.items.length = newLength

## 更新数据的方法

1. 直接赋值：对于对象中的属性，可以直接赋新值来更新。
2. 使用 Vue.set 或 this.$set：对于对象中不存在的属性，或者数组下标直接赋值，需要使用Vue.set或this.$set 来确保新属性也是响应式的。
3. 数组变异方法：Vue 重写了数组的一些方法（如 push, pop, shift, unshift, splice, sort, reverse），使得它们能够触发视图更新。

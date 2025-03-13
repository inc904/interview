# keepalive 理解

`keep-alive` 可以实现组件缓存，当组件切换的时候不会对当前组件卸载。
三个属性：

- include
- exclude
- max

前两个属性 允许有条件的缓存组件，max 定义了组件缓存的最大个数

## 原理

keep-alive 中运用了 LRU （Least Recently Used） 算法

1. 获取 keep-alive 包裹的第一个组件以及他的名称，如果 keep-alive 存在多个子元素，keep-alive 要求同时只有一个子元素被渲染。所以会在开头获取插槽内的子元素，调用 getFirstComponentsChild 方法获取第一个组件，并获取组件的 name 属性
2. 根据 设定的黑白名单（如果有）进行条件匹配，决定是否缓存组件，并缓存组件的虚拟 DOM 集合，并缓存组件的 key，不匹配则返回实例的 VNode，否则开始缓存策略
3. 根据组件 ID 和 tag 生成缓存 key，并在缓存对象中查找是否已经缓存过该组件实例。如果存在，直接取出缓存值 cache'，并更新缓存 key 在 keys 中的位置，（这是 LRU 算法的关键），如果没有缓存过，则进行 4
4. 如果不存在，则在 this.cache 中缓存组件的虚拟 DOM，并更新 keys 中，并检查数量是否超过 max，超过则根据 LRU 算法删除最不活跃的组件, 最后将组件的 keepalive 属性设置为 true

### keep-alive 在生命周期里面都做了什么：

- created： 初始化一个 cache、keys
  - cache 用来缓存组件的虚拟 DOM 集合
  - keys 用来缓存组件的 key 集合
- mounted： 实时监听 include、exclude 这两个的变化，并执行相关操作
- destory： 删除掉所有缓存的相关东西

```js
// src/core/components/keep-alive.js
export default {
  name: 'keep-alive',
  abstract: true, // 判断组件是否需要渲染成真实 DOM，keepalive 不会渲染到页面上
  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number],
  },
  created() {
    this.cache = Object.create(null) // 用来缓存虚拟 DOM
    this.keys = [] // 缓存 key
  },
  mounted() {
    // 实时监听 include、exclude 这两个的变化，并执行相关操作
    this.$watch('include', (val) => {
      pruneCache(this, (name) => matches(val, name))
    })
    this.$watch('keys', (val) => matches(val, name))
  },
  destroyed() {
    for (const key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys)
    }
  },
  render() {},
}
```

### `pruneCacheEntry`:

1. 遍历集合，执行所有缓存组件的 `$destory` 方法
2. 将 cache 对应的 key 的内容设置为 null
3. 删除 keys 中对应的元素

### render 函数：

1. 获取 keepalive 包裹的第一个组件以及他的名称
2. 判断此 组件名称 是否能被白名单、黑名单匹配，如果 `不能被白名单||黑名单匹配`，则直接返回 VNode，不往下执行，如果不符合，则往下执行 3
3. 根据组件 ID、tag 生成 缓存 key，并在缓存集合中查找是否已缓存过此组件。若果缓存过，直接取出此缓存组件，并更新 缓存 key 在 keys 中的位置，（这是 LRU 算法的关键），如果没有缓存过，则进行 4
4. 分别在 cache 和 keys 中保存此组件以及他的缓存 key，并检查数量是否超过 max，超过则根据 LRU 算法删除最不活跃的组件
5. 将此组件的 keepalive 属性设置为 true，并返回此组件的虚拟 DOM

### 渲染

vue 中一个组件怎么渲染的？render：

- render 会将此组件转成 VNode
- patch： 此函数初次渲染会直接渲染，根据拿到的 VNode 创建真实 DOM，并挂载到页面上，第二次渲染就会拿 VNode 跟旧的 VNode 进行对比，然后进行对比，打补丁（diff 算法发生在此阶段），然后渲染成正式 DOM

### keep-alive 本身渲染

keep-alive 自身组件不会被渲染到页面上，那是怎么做到的呢？其实就是通过判断组件实例上的 `abstract` 的属性值，如果是 `true` 的话，就跳过该实例，该实例也不会出现在父级链上

```js
// src/core/instance/lifecycle.js
export function initLifecycle(vm: Component) {
  const options = vm.$options
  let parent = options.parent
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent
    }
    parent.$children.push(vm)
  }
  vm.$parent = parent
}
```

### 包裹组件如何渲染

VNode ==> 真实 DOM 是发成 patch 的阶段，细分： `VNode` => `实例化` => `_update` => `真实 DOM`，而组件使用缓存的判断就发生在 实例化 这个阶段，这个阶段调用的是 createComponents 函数

```js
// src/core/vdom/patch.js
function createComponent(vnode, insertedVnodeQueue, parentElm, refElm) {
  let i = vnode.data
  if (isDef(i)) {
    const isReactivated = isDef(vnode.componentInstance) && i.keepAlive
    if (isDef((i = i.hook)) && isDef((i = i.init))) {
      i(vnode, false /* hydrating */)
    }
    if (isDef(vnode.componentInstance)) {
      initComponent(vnode, insertedVnodeQueue)
      insert(parentElm, vnode.elm, refElm) // 讲缓存的 DOM（vnode,elm）插入父元素
      if (isReactivated) {
        reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm)
      }
      return true
    }
  }
}
```

在第一次加载被包裹组件时，因为 keep-alive 的 render 先于包裹组件加载之前执行，所以此时 vnode.componentInstance 的值是 undefined，而 keepAlive 是 true，则代码走到 i(vnode, false /_ hydrating _/)就不往下走了
再次访问包裹组件时，vnode.componentInstance 的值就是已经缓存的组件实例，那么会执行 insert(parentElm, vnode.elm, refElm)逻辑，这样就直接把上一次的 DOM 插入到了父元素中。

vue2 是用 keep-alive 包裹 router-view
vue3 是用 router-view 包裹 keep-alive [官网](https://router.vuejs.org/zh/guide/advanced/router-view-slot.html#KeepAlive-Transition)

在切换 router， 实现过度效果（是用 transition 组件包裹），所以最终结构是：

```html
<router-view v-slot="{ Component }">
  <transition>
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </transition>
</router-view>
```

组件一旦被 <keep-alive> 缓存，那么再次渲染的时候就不会执行 created、mounted 等钩子函数，但是我们很多业务场景都是希望在我们被缓存的组件再次被渲染的时候做一些事情，好在 Vue 提供了 activated 和 deactivated 两个钩子函数，它的执行时机是 <keep-alive> 包裹的组件激活时调用和停用时调用

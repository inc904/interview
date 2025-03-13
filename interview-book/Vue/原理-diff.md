# diff 算法

1. 插入 虚拟 DOM 的作用
2. diff 算法，对比对象是旧 VNode 和 新 VNode，对比是哪个虚拟节点改变了，找出这个节点，并更新这个虚拟节点的真实节点。
3. diff 算法，只会在同层级进行，不会跨层级比较，深度优先算法
4. 过程： 当数据改变，会触发 setter，并通过 Dep.notify 去通知所有的 订阅者 Watcher，订阅者就会调用 Patch 方法，给真实 DOM 打补丁，更新响应的视图。

patch：

1.  对比当前同层的虚拟节点是否为同一类型的标签，如果类型不同，则直接替换，是的话就继续 patchVnode 方法。

PatchVnode 方法：

1. 找到真实的 DOM， el
2. 判断 newVnode 和 oldVnode 是否指向同一个对象，如果是，那么直接 return
3. 如果他们都有文本且不相等，那么 el 的文本直接设置为 newVnode 的文本
4. 如果 old 有子节点，new 没有，那么直接删除 old 的子节点
5. 如果 old 没有子节点，new 有，那么直接创建 new 的子节点
6. 如果 old 和 new 都有子节点，那么就进行子节点的比较，调用 updateChildren 方法

updateChildren 方法：

新旧节点对比， 首尾指针法

1. oldS =》 newS
2. oldS => newE
3. oldE => newS
4. oldE => newE
5. 如果匹配不到，对比 key， 没有 key 就会生成一个 key=>index 的对比， 找到 newVnode 中可复用的位置。
   遍历结束，如果 old 先遍历完，就把剩余的新节点插入到 dom 中
   如果 new 先遍历完，就把剩余的 old 节点删除。

key 的作用：

1. 优化 diff 算法，减少移动节点的次数，减少 DOM 操作的次数，提高性能。
2. key 的作用：当 key 不变的时候，不会触发 diff 算法，不会触发 patchVnode 方法，不会触发真实 DOM 的更新。

使用 index 12345， 不行， 使用 abcde 可以

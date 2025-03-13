vue 源码

- mvvm 整合

  - compiler 模板编译
  - observer 数据劫持
  - watcher 观察者

- mvvm 整合

  1.  收集$el、$data
  2.  $el 存在，实例化 Observer 和 Compiler

- 模板编译

  1.  存在 el， 把 el 中的内容倒腾到 fragment 中，进行遍历操作，识别 指令或者差值表达式

  2.  编译 模板

  3.  把 编译好的 fragment 再放回页面中

  - nodeToFragment： 把节点内容放到内存中
  - isElementNode： 区别节点和文本， 以便使用不同的编译方法
  - compile(fragment) 遍历所有节点，node 和 text 使用不同方法处理

    - compileElement(node)
    - compileText(text)

  - CompileUtil
    - getVal 实现 ‘info.a’ => [info, a] => vm.$data.info.a
    - updater
      - model
      - text

在编译之前，要做数据劫持，由于是对数据进行劫持，所以创建实例的时候只传入数据。

- Observer

  - observe 遍历所有属性 调用 defineReactive 做深度劫持

    - defineReactive： 使用 Object.defineProperty 实现数据劫持

    - 在 observe 的 getter 的时候添加 观察， 添加到 Dep 中， dep.addSub

    - 在 observe 的 setter 的时候添加 通知依赖的 watcher 进行更新， dep.notify()

- Watcher

  - 在获取初始值的时候，设置 Dep.target

  - 在 compiler 的 compile-text 中， new Watcher， 监控数据变化，就调用 watcher 的回调函数

  - 在 compiler 的 compile-model 中， new Watcher 数据变化，更新文本

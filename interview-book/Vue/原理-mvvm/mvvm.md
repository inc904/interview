# MVVM 的理解

MVVM（Model-View-ViewModel）是一种软件架构模式，它将应用程序的 `视图层（View）`和 `数据模型层（Model）`分离开来，以使它们之间的耦合度降低。通过视图模型层（viewModel）连接并实现数据的双向绑定。

## MVVM 的组成

- Model： 数据层/数据模型层，用于处理业务逻辑与数据库的交互。也可以看做是用于存储和管理数据的部分。在 Vue 中，Model 可以是组件的 data 选项中定义的数据对象。
- View： 视图层，用于展示数据/UI 组件的展示。在 Vue 中，View 可以是模板（template）或组件（component）。模板通过指令（directives）与 ViewModel 进行数据绑定和交互。
- ViewModel： 视图模型层，用于处理视图层与数据层的交互。它是 MVVM 模式的核心，是 View 和 Model 之间的桥梁。ViewModel 负责将 Model 中的数据转换为适合 View 显示的格式，并将 View 的用户交互事件转换为对 Model 的操作。在 Vue 中 ViewModel 是由 Vue 实例本身来扮演的。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>MVVM in Vue</title>
    <!-- 引入Vue.js库 -->
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
  </head>

  <body>
    <!-- 这是视图层，通过模板定义了用户界面 -->
    <div id="app">
      <p>姓名：{{ name }}</p>
      <p>年龄：{{ age }}</p>
      <button @click="updateName">更新姓名</button>
    </div>

    <script>
      // 这是ViewModel层，通过Vue实例连接了视图和模型
      new Vue({
        el: '#app',
        data: {
          // 这是模型层，存储了应用的数据
          name: 'John Doe',
          age: 30,
        },
        methods: {
          updateName: function () {
            // 这里可以看到，对模型数据的操作直接影响了视图的更新
            this.name = 'Jane Doe'
          },
        },
      })
    </script>
  </body>
</html>
```

## MVVM 的优点

- 低耦合：视图可以独立于 Model 变化和修改，一个 ViewModel 可以绑定到不同的 View 上，当 View 变化时 Model 可以不变，反之亦然

- 可重用性：可以将一些视图逻辑放在一个 ViewModel 中，让多个 View 重用这段视图逻辑

- 独立开发：开发人员可以专注于业务逻辑和数据的开发，设计人员可以专注于页面设计

- 可测试：ViewModel 的存在可以帮助开发者更好地编写测试代码

## MVVM 的实现原理

在 MVVM 框架中，ViewModel 层通过双向数据绑定将 View 层和 Model 层连接起来，从而使 View 层和 Model 层能够自动同步。

实现数据绑定的方法有以下几种：

- 脏值检查（如 Angular.js）

- 数据劫持（如 Vue.js）

- 发布者-订阅者模式（如 Backbone.js）

## Vue.js 与 MVVM 的关系

Vue.js 是 MVVM 架构的最佳实践之一。Vue.js 采用 Object.defineProperty 的 getter 和 setter，并结合观察者模式来实现数据绑定。

当把一个普通 JavaScript 对象传给 Vue 实例作为它的 data 选项时，Vue 将遍历它的属性，用 Object.defineProperty 将它们转为 getter/setter，从而实现数据的双向绑定。

结论

MVVM 模式通过分离视图和模型，降低了代码的耦合度，提高了代码的可重用性和可测试性
3
。它的双向数据绑定机制使得开发者可以专注于业务逻辑，而无需手动操作 DOM 或关注数据状态的同步问题
1
。

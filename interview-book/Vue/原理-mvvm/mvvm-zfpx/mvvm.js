class MVVM {
  constructor(options) {
    this.$el = options.el
    this.$data = options.data

    if (this.$el) {
      // 数据劫持，把对象的所有属性，添加 get、set 方法
      new Observer(this.$data)
      this.proxyData(this.$data)
      // 用数据和元素进行编译
      new Compile(this.$el, this)
    }
  }
  proxyData(data) {
    Object.keys(data).forEach((key) => {
      Object.defineProperty(this, key, {
        enumerable: true,
        configurable: true,
        get() {
          return data[key]
        },
        set(newValue) {
          if (newValue === data[key]) {
            return
          }
          data[key] = newValue
        },
      })
    })
  }
}

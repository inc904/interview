class Observer {
  constructor(data) {
    this.observe(data)
  }
  observe(data) {
    if (!data || typeof data !== 'object') {
      return
    }
    console.log(Object.keys(data))
    Object.keys(data).forEach((key) => {
      this.defineReactive(data, key, data[key])
      this.observe(data[key]) // 递归监听
    })
  }
  defineReactive(obj, key, value) {
    let that = this
    let dep = new Dep()
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get() {
        Dep.target && dep.addSub(Dep.target)
        console.log(`监听到${key}属性被访问`)
        return value
      },
      set(newValue) {
        console.log(`监听到${key}属性被修改`)
        if (newValue === value) {
          return
        }
        that.observe(newValue)
        value = newValue
        dep.notify()
      },
    })
  }
}

class Dep {
  constructor() {
    this.subs = []
  }
  addSub(watcher) {
    this.subs.push(watcher)
  }
  notify() {
    console.log('notify')
    this.subs.forEach((watcher) => watcher.update())
  }
}

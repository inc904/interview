class Compile {
  constructor(el, vm) {
    this.el = this.isElementNode(el) ? el : document.querySelector(el)
    this.vm = vm
    if (this.el) {
      // 1. 把节点移到内存中 fragment
      let fragment = this.nodeToFragment(this.el)
      // 2. 扫描并编译 => 提取想要的 {{}} 或者 v-model
      this.compile(fragment)
      // 3. 把fragment节点 移回页面中
      this.el.appendChild(fragment)
    }
  }

  // part: 核心方法
  compile(el) {
    let childNodes = el.childNodes
    // console.log('childNodes', childNodes)

    Array.from(childNodes).forEach((node) => {
      if (this.isElementNode(node)) {
        this.compileElement(node)
        this.compile(node)
      } else {
        // console.log('node', node)
        this.compileText(node)
      }
    })
  }
  compileElement(node) {
    let attrs = node.attributes
    Array.from(attrs).forEach((attr) => {
      let attrName = attr.name

      if (this.isDirective(attrName)) {
        let expr = attr.value
        let [, type] = attrName.split('-')

        CompileUtils[type](node, this.vm, expr)
      }
    })
  }
  compileText(node) {
    let expr = node.textContent
    // console.log('txt', expr)
    let reg = /\{\{(.+?)\}\}/
    if (reg.test(expr)) {
      CompileUtils['text'](node, this.vm, expr)
    }
  }

  nodeToFragment(el) {
    let fragment = document.createDocumentFragment()
    let child = null
    while ((child = el.firstChild)) {
      fragment.appendChild(child)
    }
    return fragment
  }
  // part: 辅助方法
  isDirective(attrName) {
    return attrName.startsWith('v-')
  }
  isElementNode(node) {
    return node.nodeType === 1
  }
  isTextNode(node) {
    return node.nodeType === 3
  }
}

CompileUtils = {
  getVal(vm, expr) {
    expr = expr.split('.')
    return expr.reduce((prev, next) => {
      return prev[next]
    }, vm.$data)
  },
  setVal(vm, expr, value) {
    expr = expr.split('.')
    expr.reduce((prev, next, currentIndex) => {
      if (currentIndex === expr.length - 1) {
        prev[next] = value
      }
      return prev[next]
    }, vm.$data)
  },
  getTextVal(vm, expr) {
    console.log('getTextVal', expr)
    return expr.replace(/\{\{(.+?)\}\}/g, (...args) => {
      return this.getVal(vm, args[1].trim())
    })
  },
  text(node, vm, expr) {
    console.log('text', expr)
    let value = this.getTextVal(vm, expr)
    let updateFn = this.updater['textUpdater']

    expr.replace(/\{\{(.+?)\}\}/g, (...args) => {
      new Watcher(vm, args[1].trim(), (newValue) => {
        updateFn && updateFn(node, this.getTextVal(vm, expr))
      })
    })

    updateFn && updateFn(node, value)
  },
  model(node, vm, expr) {
    let updateFn = this.updater['modelUpdater']
    new Watcher(vm, expr, (newValue) => {
      updateFn && updateFn(node, newValue)
    })
    node.addEventListener('input', (e) => {
      let newValue = e.target.value
      this.setVal(vm, expr, newValue)
    })
    updateFn && updateFn(node, this.getVal(vm, expr))
  },

  updater: {
    textUpdater(node, value) {
      node.textContent = value
    },
    modelUpdater(node, value) {
      node.value = value
    },
  },
}

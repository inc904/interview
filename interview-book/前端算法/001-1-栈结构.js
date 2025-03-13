class Queue {
  #item = {}
  #lowCount = 0
  #count = 0
  delQueue() {
    if (this.isEmpty()) return
    let res = this.#item[this.#lowCount]
    delete this.#item[this.#lowCount]
    this.#lowCount++
    return res
  }
  enterQueue(item) {
    this.#item[this.#count] = item
    this.#count++
  }
  front() {
    return this.#item[this.#lowCount]
  }
  size() {
    return this.#count - this.#lowCount
  }
  isEmpty() {
    return this.size() === 0
  }

  toString() {
    let s = ''
    for (let i = this.#lowCount; i < this.#count; i++) {
      s += this.#item[i] + ' '
    }
    return s
  }
  clear() {
    this.#item = {}
    this.#lowCount = 0
    this.#count = 0
  }
}

let a = new Queue()
a.enterQueue(1)
a.enterQueue(2)
a.enterQueue(3)

a.size()

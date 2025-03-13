//  数组实现队列
class Queue1 {
  constructor() {
    this.items = []
  }

  enqueue(element) {
    this.items.push(element)
  }

  dequeue() {
    return this.items.shift()
  }

  front() {
    return this.items[0]
  }

  isEmpty() {
    return this.items.length === 0
  }

  size() {
    return this.items.length
  }
}
// 对象实现队列
class Queue2 {
  constructor() {
    this.#item = {}
    this.#lowCount = 0
    this.#count = 0
  }

  enqueue(element) {
    this.#item[this.#count] = element
    this.#count++
  }

  delQueue() {
    if (this.isEmpty()) return
    let res = this.#item[this.#lowCount]
  }
}

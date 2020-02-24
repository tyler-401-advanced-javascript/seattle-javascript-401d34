class Queue {
  constructor () {
    this.storage = []
  }

  peek () {
    return this.storage.length === 0 ? null : this.storage[0]
  }

  enqueue (value) {
    return this.storage.push(value)
  }

  dequeue () {
    return this.storage.shift()
  }
}

module.exports = Queue

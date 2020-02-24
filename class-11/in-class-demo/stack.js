// this file exports our Stack class
class Stack {
  constructor () {
    this.storage = []
  }

  peek () {
    return this.storage.length ? this.storage[0] : null
  }

  push (value) {
    // the new value will go at this.storage[0]
    // everything else will get its index increased by 1
    // we can take advantage of the array unshift method
    return this.storage.unshift(value)
  }

  pop () {
    // the array shift method returns the first item of the array
    // and mutates the array, so we can just call it directly here
    return this.storage.shift()
  }
}

module.exports = Stack

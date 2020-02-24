const Queue = require('../queue.js')

// What things should a Queue be able to do?
// peek(), enqueue(), dequeue()

describe('Queue', () => {
  describe('peek()', () => {
    describe('when the queue is empty', () => {
      const testQueue = new Queue()
      it('returns null', () => {
        expect(testQueue.peek()).toEqual(null)
      })
    })
    describe('when the queue is populated', () => {
      const testQueue = new Queue()
      testQueue.storage = ['a', 'b', 'c']
      it('returns the first item in the queue\'s storage', () => {
        expect(testQueue.peek()).toEqual(testQueue.storage[0])
      })
      it('does not modify the length of the queue\'s storage', () => {
        expect(testQueue.storage.length).toEqual(3)
      })
    })
  })

  describe('enqueue()', () => {
    const testQueue = new Queue()
    it('returns the incremented length of the queue\'s storage', () => {
      expect(testQueue.enqueue('banana')).toEqual(1)
    })
    it('adds a new value to the end of the queue\'s storage', () => {
      expect(testQueue.storage[testQueue.storage.length - 1]).toEqual('banana')
    })
  })

  describe('dequeue()', () => {
    describe('when the queue is empty', () => {
      const testQueue = new Queue()
      it('returns undefined', () => {
        expect(testQueue.dequeue()).toBeUndefined()
      })
    })
    describe('when the queue is populated', () => {
      const testQueue = new Queue()
      testQueue.storage = ['a', 'b', 'c', 'd']
      it('returns the first item of the queue\'s storage', () => {
        expect(testQueue.dequeue()).toEqual('a')
      })
      it('decrements the length of the queue\'s storage', () => {
        expect(testQueue.storage.length).toEqual(3)
      })
      it('bumps the old second item up to new first', () => {
        expect(testQueue.storage[0]).toEqual('b')
      })
    })
  })
})

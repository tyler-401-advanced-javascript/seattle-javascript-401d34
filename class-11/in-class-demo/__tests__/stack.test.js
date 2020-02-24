const Stack = require('../stack.js')

// What things should a Stack be able to do?
// peek(), push(), pop()

describe('Stack', () => {
  describe('peek()', () => {
    describe('when the stack is empty', () => {
      const testStack = new Stack()
      it('returns null', () => {
        expect(testStack.peek()).toEqual(null)
      })
    })
    describe('when the stack is populated', () => {
      const testStack = new Stack()
      testStack.storage = ['c', 'b', 'a']
      it('returns the top element of the stack', () => {
        expect(testStack.peek()).toEqual('c')
      })
      it('doesn\'t change the length of the stack', () => {
        expect(testStack.storage.length).toEqual(3)
      })
    })
  })

  describe('push()', () => {
    const testStack = new Stack()
    it('returns the new length of the stack\'s storage', () => {
      expect(testStack.push('banana')).toEqual(testStack.storage.length)
    })
    it('increments the length of the stack\'s storage', () => {
      expect(testStack.storage.length).toEqual(1)
    })
    it('the top item of the stack\'s storage is what we added', () => {
      expect(testStack.storage[0]).toEqual('banana')
    })
  })

  describe('pop()', () => {
    describe('when the stack is empty', () => {
      const testStack = new Stack()
      it('returns undefined', () => {
        expect(testStack.pop()).toBeUndefined()
      })
    })
    describe('when the stack is populated', () => {
      const testStack = new Stack()
      testStack.storage = ['c', 'b', 'a']
      it('returns the top value from the stack\'s storage', () => {
        expect(testStack.pop()).toEqual('c')
      })
      it('decreases the length of the stack\'s storage', () => {
        expect(testStack.storage.length).toEqual(2)
      })
      it('removes the top value from the stack\'s storage', () => {
        expect(testStack.storage).toEqual(['b', 'a'])
      })
    })
  })
})

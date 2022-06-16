import { EventEmitter2 } from 'eventemitter2'
import { testTrapError, thrower } from './trapErrorTest'

describe('trapError', () => {
  test('trap error from `addListener()`', () => {
    testTrapError(new EventEmitter2(), a => {
      a.addListener('event', thrower)
      a.emit('event')
    })
  })
  test('trap error from `on()`', () => {
    testTrapError(new EventEmitter2(), a => {
      a.on('event', thrower)
      a.emit('event')
    })
  })
  test('trap error from `once()`', () => {
    testTrapError(new EventEmitter2(), a => {
      a.once('event', thrower)
      a.emit('event')
    })
  })
  test('trap error from `prependListener()`', () => {
    testTrapError(new EventEmitter2(), a => {
      a.prependListener('event', thrower)
      a.emit('event')
    })
  })
  test('trap error from `prependOnceListener()`', () => {
    testTrapError(new EventEmitter2(), a => {
      a.prependOnceListener('event', thrower)
      a.emit('event')
    })
  })
})

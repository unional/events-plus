import { EventEmitter } from 'events'
import { testTrapError, thrower } from './trapErrorTest.js'

describe('trapError', () => {
  test('trap error from `addListener()`', () => {
    testTrapError(new EventEmitter(), a => {
      a.addListener('event', thrower)
      a.emit('event')
    })
  })
  test('trap error from `on()`', () => {
    testTrapError(new EventEmitter(), a => {
      a.on('event', thrower)
      a.emit('event')
    })
  })
  test('trap error from `once()`', () => {
    testTrapError(new EventEmitter(), a => {
      a.once('event', thrower)
      a.emit('event')
    })
  })
  test('trap error from `prependListener()`', () => {
    testTrapError(new EventEmitter(), a => {
      a.prependListener('event', thrower)
      a.emit('event')
    })
  })
  test('trap error from `prependOnceListener()`', () => {
    testTrapError(new EventEmitter(), a => {
      a.prependOnceListener('event', thrower)
      a.emit('event')
    })
  })
})

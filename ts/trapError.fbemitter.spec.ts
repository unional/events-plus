import { EventEmitter } from 'fbemitter'
import { testTrapError, thrower } from './trapErrorTest'

describe('trapError', () => {
  test('trap error from `addListener()`', () => {
    testTrapError(new EventEmitter(), a => {
      a.addListener('event', thrower)
      a.emit('event')
    })
  })
  test('trap error from `once()`', () => {
    testTrapError(new EventEmitter(), a => {
      a.once('event', thrower)
      a.emit('event')
    })
  })
})

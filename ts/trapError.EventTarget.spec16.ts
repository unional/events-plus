import { testTrapError, thrower } from './trapErrorTest.js'

describe('trapError', () => {
  test('trap error from `addEventListener()`', () => {
    testTrapError(new EventTarget(), a => {
      a.addEventListener('event', thrower)
      a.dispatchEvent(new Event('event'))
    })
  })
})

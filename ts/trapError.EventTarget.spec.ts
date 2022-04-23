import { beforeEachTrapErrorTest, testTrapError, thrower } from './trapErrorTest'

beforeEachTrapErrorTest()

describe('trapError', () => {
  test('trap error from `addEventListener()`', () => {
    testTrapError(new EventTarget(), a => {
      a.addEventListener('event', thrower)
      a.dispatchEvent(new Event('event'))
    })
  })
})

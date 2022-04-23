import { EventTargetLike } from './types'

describe('EventEmitter type', () => {
  test('accept EventTarget', () => {
    const e = new EventTarget()
    const a: EventTargetLike = e
    expect(a).toBeDefined()
  })
})

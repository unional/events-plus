import { EventTargetLike } from './types.js'

describe('EventEmitter type', () => {
  test('accept EventTarget', () => {
    const e = new EventTarget()
    const a: EventTargetLike = e
    expect(a).toBeDefined()
  })
})

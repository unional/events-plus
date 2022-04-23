import { EventEmitterBase } from './types'

describe('EventEmitter type', () => {
  test('accept EventTarget', () => {
    const e = new EventTarget()
    const a: EventEmitterBase = e
    expect(a).toBeDefined()
  })
})

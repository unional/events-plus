import { EventEmitter2 } from 'eventemitter2'
import { EventEmitter as EE3 } from 'eventemitter3'
import { EventEmitter as FBEE } from 'fbemitter'
import { EventEmitter as NodeEE } from 'events'
import { EventEmitterLike, EventTargetLike } from './types'

describe('EventEmitter type', () => {
  test('accept nodejs', () => {
    const e = new NodeEE()
    const a: EventEmitterLike = e
    expect(a).toBeDefined()
  })
  test('accept EventEmitter3', () => {
    const e = new EE3()
    const a: EventEmitterLike = e
    expect(a).toBeDefined()
  })
  test('accept fbemitter', () => {
    const e = new FBEE()
    const a: EventEmitterLike = e
    expect(a).toBeDefined()
  })
  test('accept eventemitter2', () => {
    const e = new EventEmitter2()

    const a: EventEmitterLike = e
    expect(a).toBeDefined()
  })
  test('accept EventTarget', () => {
    const e = new EventTarget()
    const a: EventTargetLike = e
    expect(a).toBeDefined()
  })
})

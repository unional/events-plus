import { EventEmitter2 } from 'eventemitter2'
import { EventEmitter as EE3 } from 'eventemitter3'
import { EventEmitter as FBEE } from 'fbemitter'
import { EventEmitter as NodeEE } from 'events'
import { EventEmitterBase } from './types'

describe('EventEmitter type', () => {
  test('accept nodejs', () => {
    const e = new NodeEE()
    const a: EventEmitterBase = e
    expect(a).toBeDefined()
  })
  test('accept EventEmitter3', () => {
    const e = new EE3()
    const a: EventEmitterBase = e
    expect(a).toBeDefined()
  })
  test('accept fbemitter', () => {
    const e = new FBEE()
    const a: EventEmitterBase = e
    expect(a).toBeDefined()
  })
  test('accept eventemitter2', () => {
    const e = new EventEmitter2()

    const a: EventEmitterBase = e
    expect(a).toBeDefined()
  })
})

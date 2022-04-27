import { EventEmitter2 } from 'eventemitter2'
import { EventEmitter as EE3 } from 'eventemitter3'
import { EventEmitter as NodeEE } from 'events'
import { EventEmitter as FBEE } from 'fbemitter'
import { canAssign } from 'type-plus'
import { EventEmitterLike } from './types'

describe('EventEmitterLike', () => {
  test('accept nodejs', () => {
    const e = new NodeEE()
    canAssign<EventEmitterLike>()(e)
  })
  test('accept EventEmitter3', () => {
    const e = new EE3()
    canAssign<EventEmitterLike>()(e)
  })
  test('accept fbemitter', () => {
    const e = new FBEE()
    canAssign<EventEmitterLike>()(e)
  })
  test('accept eventemitter2', () => {
    const e = new EventEmitter2()
    canAssign<EventEmitterLike>()(e)
  })
})

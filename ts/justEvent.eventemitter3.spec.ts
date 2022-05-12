import { EventEmitter } from 'eventemitter3'
import { justEvent } from './justEvent'

test('usage', () => {
  const emitter = new EventEmitter()

  const count = justEvent<number>('count')

  emitter.addListener(count.type, count.listener(value => expect(value).toBe(1)))

  emitter.emit(count.type, ...count(1))
})

it('takes emitter for listenTo and emitBy', () => {
  const emitter = new EventEmitter()

  const count = justEvent<number>('count')

  count.listenTo(emitter, value => expect(value).toBe(1))
  count.emitBy(emitter, 1)
})

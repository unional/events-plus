import { EventEmitter } from 'fbemitter'
import { justEvent } from './justEvent'

test('usage', () => {
  const emitter = new EventEmitter()

  const count = justEvent<number>('count')

  emitter.addListener(count.type, count.listener(value => expect(value).toBe(1)))

  emitter.emit(count.type, ...count(1))
})

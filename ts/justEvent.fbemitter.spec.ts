import { EventEmitter } from 'fbemitter'
import { justEvent } from './index.js'

test('usage', () => {
  const emitter = new EventEmitter()

  const count = justEvent<number>('count')

  emitter.addListener(count.type, count.handle(value => expect(value).toBe(1)))

  emitter.emit(count.type, ...count(1))
})

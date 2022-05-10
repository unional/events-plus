import { EventEmitter2 } from 'eventemitter2'
import { justEvent } from './justEvent'

test('usage', () => {
  const emitter = new EventEmitter2()

  const count = justEvent<number>('count')

  emitter.addListener(count.type, count.handle(value => expect(value).toBe(1)))

  emitter.emit(count.type, ...count(1))
})

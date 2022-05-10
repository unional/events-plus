import { justEvent } from './justEvent'

test('usage', () => {
  const emitter = new EventTarget()

  const count = justEvent<number>('count')

  const e = new Event(count.type)
  emitter.addEventListener(count.type, event => expect(event).toBe(e))
  emitter.dispatchEvent(e)
})

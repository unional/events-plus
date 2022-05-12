import { JustDuo, JustEmpty, JustMeta, JustUno } from '@just-func/types'
import { EventEmitterLike, EventTargetLike, isEventEmitterLike, isEventTargetLike } from './types'

export interface JustEventDuo<
  Type extends string,
  Value, Meta extends JustMeta> {
  type: Type,
  (value: Value, meta: Meta): JustDuo<Value, Meta>,
  listener(callback: (value: Value, meta: Meta) => unknown): (...args: any[]) => any,
  listenTo(emitter: EventEmitterLike | EventTargetLike, callback: (value: Value, meta: Meta) => unknown): void,
  emitBy(emitter: EventEmitterLike | EventTargetLike, value: Value, meta: Meta): void
}

export interface JustEventUno<
  Type extends string,
  Value> {
  type: Type,
  (value: Value): JustUno<Value>,
  listener(callback: (value: Value) => unknown): (...args: any[]) => any,
  listenTo(emitter: EventEmitterLike | EventTargetLike, callback: (value: Value) => unknown): void,
  emitBy(emitter: EventEmitterLike | EventTargetLike, value: Value): void
}

export interface JustEventEmpty<
  Type extends string> {
  type: Type,
  (): JustEmpty,
  listener(callback: () => unknown): (...args: any[]) => any,
  listenTo(emitter: EventEmitterLike | EventTargetLike, callback: () => unknown): void,
  emitBy(emitter: EventEmitterLike | EventTargetLike): void
}

export function justEvent(type: string): JustEventEmpty<typeof type>
export function justEvent<Value>(type: string): JustEventUno<typeof type, Value>
export function justEvent<Value, Meta extends JustMeta>(type: string): JustEventDuo<typeof type, Value, Meta>
export function justEvent<Value, Meta extends JustMeta>(type: string): any {
  return Object.assign(function event(value: Value, meta: Meta): JustDuo<Value, Meta> {
    return [value, meta]
  }, {
    type,
    listener(callback: (...args: any[]) => any) { return callback },
    listenTo(emitter: EventEmitterLike | EventTargetLike, callback: (...args: any[]) => any) {
      if (isEventEmitterLike(emitter)) emitter.addListener(this.type, callback)
      if (isEventTargetLike(emitter)) emitter.addEventListener(this.type, callback)
    },
    emitBy(emitter: EventEmitterLike | EventTargetLike, value: Value, meta: Meta): void {
      if (isEventEmitterLike(emitter)) emitter.emit(this.type, value, meta)
      if (isEventTargetLike(emitter)) emitter.dispatchEvent(new Event(this.type))
    }
  })
}

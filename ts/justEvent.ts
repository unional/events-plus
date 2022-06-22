import { JustDuo, JustEmpty, JustMeta, JustUno } from '@just-func/types'
import { EventEmitterLike, EventTargetLike, isEventEmitterLike, isEventTargetLike } from './types.js'

/**
 * Event with Value and Meta
 */
export interface JustEventDuo<
  Type extends string,
  Value, Meta extends JustMeta> {
  /**
   * The event type: `emitter.emit(event.type)`
   */
  type: Type,
  /**
   * Create event argments as in `emitter.emit(event.type, ...event(value, meta))`.
   */
  (value: Value, meta: Meta): JustDuo<Value, Meta>,
  /**
   * creates the event handler with type support
   */
  handle(handler: (value: Value, meta: Meta) => unknown): (...args: any[]) => any,
  /**
   * A functional and normalized way to call `emitter.addListener(...)`
   */
  listenTo(emitter: EventEmitterLike | EventTargetLike, handler: (value: Value, meta: Meta) => unknown): void,
  /**
   * A functional and normalized way to call `emitter.emit(...)`
   */
  emitBy(emitter: EventEmitterLike | EventTargetLike, value: Value, meta: Meta): void
}

/**
 * Event with Value only
 */
export interface JustEventUno<
  Type extends string,
  Value> {
  /**
   * The event type: `emitter.emit(event.type)`
   */
  type: Type,
  /**
   * Create event argments as in `emitter.emit(event.type, ...event(value))`.
   */
  (value: Value): JustUno<Value>,
  /**
   * creates the event handler with type support
   */
  handle(handler: (value: Value) => unknown): (...args: any[]) => any,
  /**
   * A functional and normalized way to call `emitter.addListener(...)`
   */
  listenTo(emitter: EventEmitterLike | EventTargetLike, handler: (value: Value) => unknown): void,
  /**
   * A functional and normalized way to call `emitter.emit(...)`
   */
  emitBy(emitter: EventEmitterLike | EventTargetLike, value: Value): void
}

/**
 * Event with no value
 */
export interface JustEventEmpty<
  Type extends string> {
  /**
   * The event type: `emitter.emit(event.type)`
   */
  type: Type,
  /**
   * Create event argments as in `emitter.emit(event.type, ...event())`.
   * Since this event has no value, this function returns an empty array.
   */
  (): JustEmpty,
  /**
   * creates the event handler with type support
   */
  handle(handler: () => unknown): (...args: any[]) => any,
  /**
   * A functional and normalized way to call `emitter.addListener(...)`
   */
  listenTo(emitter: EventEmitterLike | EventTargetLike, handler: () => unknown): void,
  /**
   * A functional and normalized way to call `emitter.emit(...)`
   */
  emitBy(emitter: EventEmitterLike | EventTargetLike): void
}

/**
 * Creates just an event that is typed and easy to use.
 */
export function justEvent(type: string): JustEventEmpty<typeof type>
/**
 * Creates just an event that is typed and easy to use.
 */
export function justEvent(type: string, handler: () => unknown): JustEventEmpty<typeof type> & {
  /**
   * The default event handler
   */
  handler: () => unknown
}
/**
 * Creates just an event that is typed and easy to use.
 */
export function justEvent<Value>(type: string, handler: (value: Value) => unknown): JustEventUno<typeof type, Value> & {
  /**
   * The default event handler
   */
  handler: (value: Value) => unknown
}
/**
 * Creates just an event that is typed and easy to use.
 */
export function justEvent<Value>(type: string): JustEventUno<typeof type, Value>
/**
 * Creates just an event that is typed and easy to use.
 */
export function justEvent<Value, Meta extends JustMeta>(type: string): JustEventDuo<typeof type, Value, Meta>
/**
 * Creates just an event that is typed and easy to use.
 */
export function justEvent<Value, Meta extends JustMeta>(type: string, handler: (value: Value, meta: Meta) => unknown): JustEventDuo<typeof type, Value, Meta> & {
  /**
   * The default event handler
   */
  handler: (value: Value, meta: Meta) => unknown
}
export function justEvent<Value, Meta extends JustMeta>(type: string, handler?: (...args: any[]) => any): any {
  return Object.assign(function event(value: Value, meta: Meta): JustDuo<Value, Meta> {
    return [value, meta]
  }, {
    type,
    handler,
    handle(callback: (...args: any[]) => any) { return callback },
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

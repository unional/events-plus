import { JustDuo, JustEmpty, JustMeta, JustUno } from '@just-func/types'

export interface JustEventDuo<
  Type extends string,
  Value, Meta extends JustMeta> {
  type: Type,
  (value: Value, meta: Meta): JustDuo<Value, Meta>,
  handle(handler: (value: Value, meta: Meta) => unknown): (...args: any[]) => any
}

export interface JustEventUno<
  Type extends string,
  Value> {
  type: Type,
  (value: Value): JustUno<Value>,
  handle(handler: (value: Value) => unknown): (...args: any[]) => any
}

export interface JustEventEmpty<
  Type extends string> {
  type: Type,
  (): JustEmpty,
  handle(handler: () => unknown): (...args: any[]) => any
}

export function justEvent(type: string): JustEventEmpty<typeof type>
export function justEvent<Value>(type: string): JustEventUno<typeof type, Value>
export function justEvent<Value, Meta extends JustMeta>(type: string): JustEventDuo<typeof type, Value, Meta>
export function justEvent<Value, Meta extends JustMeta>(type: string): any {
  return Object.assign(function event(value: Value, meta: Meta): JustDuo<Value, Meta> {
    return [value, meta]
  }, {
    type,
    handle(handler: (...args: any[]) => any) { return handler }
  })
}

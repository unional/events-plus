export interface EventEmitterBase {
  addListener(eventName: string | symbol, listener: (...args: any[]) => void): any,
  once(eventName: string | symbol, listener: (...args: any[]) => void): any,
  removeAllListeners(event?: string | symbol): any,
  // eslint-disable-next-line @typescript-eslint/ban-types
  listeners(eventName: string | symbol): Array<Function>,
  emit(eventName: string | symbol, ...args: any[]): boolean | void,
}

export interface EventEmitter {
  addListener(eventName: string | symbol, listener: (...args: any[]) => void): any,
  // on(eventName: string | symbol, listener: (...args: any[]) => void): this,
  once(eventName: string | symbol, listener: (...args: any[]) => void): any,
  // off(eventName: string | symbol, listener: (...args: any[]) => void): this,
  removeListener(eventName: string | symbol, listener: (...args: any[]) => void): this,
  removeAllListeners(event?: string | symbol): any,
  // eslint-disable-next-line @typescript-eslint/ban-types
  listeners(eventName: string | symbol): Array<Function>,
  emit(eventName: string | symbol, ...args: any[]): boolean | void,
  // eventNames(): Array<string | symbol>
}

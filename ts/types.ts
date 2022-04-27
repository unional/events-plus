
export interface EventEmitterLike {
  addListener(eventName: string | symbol, listener: (...args: any[]) => void): any,
  once(eventName: string | symbol, listener: (...args: any[]) => void): any,
  removeAllListeners(event?: string | symbol): any,
  // eslint-disable-next-line @typescript-eslint/ban-types
  listeners(eventName: string | symbol): Array<Function>,
  emit(eventName: string | symbol, ...args: any[]): boolean | void,
}

export interface EventTargetLike {
  addEventListener(type: string, callback: EventListenerOrEventListenerObject | null, options?: AddEventListenerOptions | boolean): void,
  dispatchEvent(event: Event): boolean
}

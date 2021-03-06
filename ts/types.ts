export interface EventEmitterLike {
  addListener(eventName: string | symbol, listener: (...args: any[]) => void): any,
  once(eventName: string | symbol, listener: (...args: any[]) => void): any,
  removeAllListeners(event?: string | symbol): any,
  // eslint-disable-next-line @typescript-eslint/ban-types
  listeners(eventName: string | symbol): Array<Function>,
  emit(eventName: string | symbol, ...args: any[]): boolean | void,
}

export function isEventEmitterLike(target: any): target is EventEmitterLike {
  return !!target.emit
}

export interface EventTargetLike {
  addEventListener(type: string, callback: EventListenerOrEventListenerObject | null, options?: AddEventListenerOptions | boolean): void,
  /** Dispatches a synthetic event event to target and returns true if either event's cancelable attribute value is false or its preventDefault() method was not invoked, and false otherwise. */
  dispatchEvent(event: Event): boolean,
  /** Removes the event listener in target's event listener list with the same type, callback, and options. */
  removeEventListener(type: string, callback: EventListenerOrEventListenerObject | null, options?: EventListenerOptions | boolean): void
}

export function isEventTargetLike(target: any): target is EventTargetLike {
  return !!target.addEventListener
}

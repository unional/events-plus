import { EventEmitterLike, EventTargetLike } from './types'

export interface ErrorLogger {
  error(...args: any[]): void
}

function overrideListener(target: any, logger: ErrorLogger, methodName: string) {
  const fn = target[methodName]
  target[methodName] = function (
    eventName: string | symbol,
    listener: (...args: any[]) => void
  ) {
    fn.call(target, eventName, function wrappedListener(...args: any[]) {
      try { listener(...args) }
      catch (e) { logger.error(e) }
    })
  }
}

function overrideEmit(target: any, logger: ErrorLogger, methodName: string) {
  const fn = target[methodName]
  target[methodName] = function (eventName: string | symbol, ...args: any[]) {
    try { fn.call(target, eventName, ...args) }
    catch (e) { logger.error(e) }
  }
}

/**
 * creates a curried `trapError()` function with predefined trap.
 */
export function errorTraper(logger: ErrorLogger = console) {
  return function trapEmitterError<E extends EventEmitterLike | EventTargetLike>(emitter: E): E {
    const target: any = emitter
    if (target.emit) overrideEmit(target, logger, 'emit')
    if (target.addEventListener) overrideListener(target, logger, 'addEventListener')
    return emitter
  }
}

/**
 * trap errors in emitter listeners
 */
export function trapError<E extends EventEmitterLike | EventTargetLike>(emitter: E, logger: ErrorLogger = console): E {
  return errorTraper(logger)(emitter)
}

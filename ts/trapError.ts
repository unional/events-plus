import { EventEmitterLike, EventTargetLike } from './types'

export interface ErrorTrap {
  error(...args: any[]): void
}

function overrideFn(target: any, trap: ErrorTrap, fn: (...args: any[]) => void) {
  return function (
    eventName: string | symbol,
    listener: (...args: any[]) => void
  ) {
    const wrappedListener = function (...args: any[]) {
      try {
        listener(...args)
      }
      catch (e) {
        trap.error(e)
      }
    }
    fn.call(target, eventName, wrappedListener)
  }
}

/**
 * creates a curried `trapError()` function with predefined trap.
 */
export function errorTraper(trap: ErrorTrap = console) {
  return function trapEmitterError<E extends EventEmitterLike | EventTargetLike>(emitter: E): E {
    const target: any = emitter
    if (target.addListener) {
      target.addListener = overrideFn(target, trap, target.addListener)
    }
    if (target.on) {
      target.on = overrideFn(target, trap, target.on)
    }
    if (target.once) {
      target.once = overrideFn(target, trap, target.once)
    }
    if (target.prependListener) {
      target.prependListener = overrideFn(target, trap, target.prependListener)
    }
    if (target.prependOnceListener) {
      target.prependOnceListener = overrideFn(target, trap, target.prependOnceListener)
    }
    if (target.addEventListener) {
      target.addEventListener = overrideFn(target, trap, target.addEventListener)
    }

    return emitter
  }
}

/**
 * trap errors in emitter listeners
 */
export function trapError<E extends EventEmitterLike | EventTargetLike>(emitter: E, trap: ErrorTrap = console): E {
  return errorTraper(trap)(emitter)
}

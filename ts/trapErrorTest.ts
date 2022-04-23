import { configForTest, getLogger, MemoryLogReporter } from 'standard-log'
import { EventEmitterLike, trapError } from '.'
import { EventTargetLike } from './types'

let reporter: MemoryLogReporter
export function beforeEachTrapErrorTest() {
  beforeEach(() => reporter = configForTest().reporter)
}

export function thrower() { throw new Error('something went wrong') }

export function setupTrapError<E extends EventEmitterLike | EventTargetLike>(emitter: E): E {
  const log = getLogger('a')
  return trapError(emitter, log)
}
export function assertTrapError() {
  const m = reporter.getLogMessageWithLevel()
  expect(m.split('something went wrong').length).toEqual(2)
}

export function testTrapError<E extends EventEmitterLike | EventTargetLike>(emitter: E, act: (trapped: E) => void) {
  const a = setupTrapError(emitter)

  act(a)

  assertTrapError()
}

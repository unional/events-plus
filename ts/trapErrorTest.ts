import a from 'assert'
import { createStandardLogForTest } from 'standard-log'
import { StandardLogForTest } from 'standard-log/cjs/standardLog'
import { EventEmitterLike, trapError } from '.'
import { EventTargetLike } from './types'

export function thrower() { throw new Error('something went wrong') }

export function setupTrapError<E extends EventEmitterLike | EventTargetLike>(emitter: E): [StandardLogForTest, E] {
  const standardLog = createStandardLogForTest()
  const log = standardLog.getLogger('a')
  return [standardLog, trapError(emitter, log)]
}
export function assertTrapError(standardLog: StandardLogForTest) {
  const m = standardLog.reporter.getLogMessageWithLevel()
  const l = m.split('something went wrong').length
  a.equal(l, 2, `missing error: ${m}`)
}

export function testTrapError<E extends EventEmitterLike | EventTargetLike>(emitter: E, act: (trapped: E) => void) {
  const [standardLog, a] = setupTrapError(emitter)

  act(a)

  assertTrapError(standardLog)
}

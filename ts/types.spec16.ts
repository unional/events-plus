import { canAssign } from 'type-plus'
import { EventTargetLike } from './types'

describe('EventTargetLike', () => {
  test('accept EventTarget', () => {
    const e = new EventTarget()
    canAssign<EventTargetLike>()(e)
  })
})

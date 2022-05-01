import { isType } from 'type-plus'
import { ErrorFSAEvent, ErrorFSAEventBare, ErrorFSAEventWithError, ErrorFSAEventWithMeta, ErrorFSAEventWithMetaAndError, FSAEvent, FSAEventBare, FSAEventWithErrorPayload, FSAEventWithMeta, FSAEventWithMetaAndErrorPayload, FSAEventWithPayload, FSAEventWithPayloadAndErrorPayload, FSAEventWithPayloadAndMeta, FSAEventWithPayloadAndMetaAndErrorPayload } from './FSAEvent'

class CustomError extends Error {
  foo() { }
}
type DummyMeta = { logs: string[] }

describe('FSAEvent', () => {
  test('by default Payload, Meta, and ErrorPayload are optional', () => {
    type A = FSAEvent
    isType.equal<true, FSAEvent<string, undefined, undefined, Error | undefined>, A>()
    isType.equal<true, FSAEventBare<string> | FSAEventWithErrorPayload<string, Error>, A>()
  })
  test('event type is narrowed as const', () => {
    type A = FSAEvent<'abc'>
    isType.equal<true, 'abc', A['type']>()
  })
  test('event with payload', () => {
    type A = FSAEvent<'abc', number>
    isType.equal<true, FSAEventWithPayload<'abc', number> | FSAEventWithPayloadAndErrorPayload<'abc', number, Error>, A>()
  })
  test('event with meta only', () => {
    type A = FSAEvent<'abc', undefined, DummyMeta>
    isType.equal<true, FSAEventWithMeta<'abc', DummyMeta> | FSAEventWithMetaAndErrorPayload<'abc', DummyMeta, Error>, A>()
  })
  test('event with payload and meta', () => {
    type A = FSAEvent<'abc', number, DummyMeta>
    isType.equal<true, FSAEventWithPayloadAndMeta<'abc', number, DummyMeta> | FSAEventWithPayloadAndMetaAndErrorPayload<'abc', number, DummyMeta, Error>, A>()
  })
  // TODO test CustomError variants
})

describe('ErrorFSAEvent', () => {
  describe('with no type specified (bare)', () => {
    test('by default error is undefined', () => {
      type A = ErrorFSAEvent
      isType.equal<true, ErrorFSAEvent<string, undefined, undefined>, A>()
      isType.equal<true, ErrorFSAEventBare<string>, A>()
    })
  })
  test('event type is narrowed as const', () => {
    type A = ErrorFSAEvent<'abc'>
    isType.equal<true, 'abc', A['type']>()
  })
  test('event with Meta', () => {
    type A = ErrorFSAEvent<'abc', DummyMeta>
    isType.equal<true, ErrorFSAEventWithMeta<'abc', DummyMeta>, A>()
  })
  test('event with custom Error', () => {
    type A = ErrorFSAEvent<'abc', undefined, CustomError>
    isType.equal<true, ErrorFSAEventWithError<'abc', CustomError>, A>()
  })
  test('event with Meta and custom Error', () => {
    type A = ErrorFSAEvent<'abc', DummyMeta, CustomError>
    isType.equal<true, ErrorFSAEventWithMetaAndError<'abc', DummyMeta, CustomError>, A>()
  })
  test('event with Meta and optional custom Error', () => {
    type A = ErrorFSAEvent<'abc', DummyMeta, CustomError | undefined>
    isType.equal<true, ErrorFSAEventWithMeta<'abc', DummyMeta> | ErrorFSAEventWithMetaAndError<'abc', DummyMeta, CustomError>, A>()
  })
})

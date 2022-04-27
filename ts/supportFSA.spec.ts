import t from 'assert'
import { isType } from 'type-plus'
import {
  createFSAEvent, ErrorFSAEventBare, ErrorLike, FSAEvent, FSAEventBare, FSAEventWithMeta, FSAEventWithPayload, FSAEventWithPayloadAndMeta
} from '.'
import { ErrorFSA, ErrorFSABare, ErrorFSAWithError, FSABare, FSAWithMeta, FSAWithPayload, FSAWithPayloadAndMeta, isError, isFSA } from './FSA'
import { ErrorFSAEvent, ErrorFSAEventWithError, ErrorFSAEventWithMeta, ErrorFSAEventWithMetaAndError } from './supportFSA'

class CustomError extends Error {
  foo() { }
}
type DummyMeta = { logs: string[] }

describe('FSAEvent', () => {
  test('by default payload and meta are optional', () => {
    type A = FSAEvent
    isType.equal<true, FSAEvent<string, undefined, undefined, Error | undefined>, A>()
    isType.equal<true, FSAEventBare | ErrorFSAEventBare | ErrorFSAEventWithError, A>()
  })
  test('event type is narrowed as const', () => {
    type A = FSAEvent<'abc'>
    isType.equal<true, 'abc', A['type']>()
    isType.equal<true, 'abc', ReturnType<A>['type']>()
  })
  test('event with payload', () => {
    type A = FSAEvent<'abc', number>
    isType.equal<true, FSAEventWithPayload<'abc', number> | ErrorFSAEventBare<'abc'> | ErrorFSAEventWithError<'abc', Error>, A>()
  })
  test('event with meta only', () => {
    type A = FSAEvent<'abc', undefined, DummyMeta>
    isType.equal<true, FSAEventWithMeta<'abc', DummyMeta> | ErrorFSAEventWithMeta<'abc', DummyMeta> | ErrorFSAEventWithMetaAndError<'abc', DummyMeta, Error>, A>()
  })
  test('event with payload and meta', () => {
    type A = FSAEvent<'abc', number, DummyMeta>
    isType.equal<true, FSAEventWithPayloadAndMeta<'abc', number, DummyMeta> | ErrorFSAEventWithMeta<'abc', DummyMeta> | ErrorFSAEventWithMetaAndError<'abc', DummyMeta, Error>, A>()
  })
  // TODO test CustomError variants
})

describe('ErrorFSAEvent', () => {
  test('by default error can be Error or undefined', () => {
    type A = ErrorFSAEvent
    isType.equal<true, ErrorFSAEvent<string, undefined, Error | undefined>, A>()
    isType.equal<true, ErrorFSAEventBare<string> | ErrorFSAEventWithError<string, Error>, A>()
  })
  test('event type is narrowed as const', () => {
    type A = ErrorFSAEvent<'abc'>
    isType.equal<true, 'abc', A['type']>()
    isType.equal<true, 'abc', ReturnType<A>['type']>()
  })
  test('event with Meta', () => {
    type A = ErrorFSAEvent<'abc', DummyMeta>
    isType.equal<true, ErrorFSAEventWithMeta<'abc', DummyMeta> | ErrorFSAEventWithMetaAndError<'abc', DummyMeta, Error>, A>()
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
    isType.equal<true, ErrorFSAEventWithMeta<'abc', DummyMeta>| ErrorFSAEventWithMetaAndError<'abc', DummyMeta, CustomError>, A>()
  })
})

describe('createEvent()', () => {
  test('defaults to no payload and meta', () => {
    const beep = createFSAEvent('beep')
    // ! type is not narrowed to const
    isType.equal<true, FSAEventBare<string> | ErrorFSAEventBare<string> | ErrorFSAEventWithError<string, Error>, typeof beep>()
  })
  test('with Payload', () => {
    const count = createFSAEvent<number>('count')
    isType.equal<true, FSAEventWithPayload<string, number> | ErrorFSAEventBare<string> | ErrorFSAEventWithError<string, Error>, typeof count>()
  })

  test('with Payload and Meta', () => {
    const count = createFSAEvent<number, string>('count')
    isType.equal<true, FSAEventWithPayloadAndMeta<string, number, string> | ErrorFSAEventWithMeta<string, string> | ErrorFSAEventWithMetaAndError<string, string, Error>, typeof count>()
  })

  test('with Meta only', () => {
    const beep = createFSAEvent<undefined, string>('beep')
    isType.equal<true, FSAEventWithMeta<string, string> | ErrorFSAEventWithMeta<string, string> | ErrorFSAEventWithMetaAndError<string, string, Error>, typeof beep>()
  })

  test('default event creates FSA', () => {
    const beep = createFSAEvent('beep')
    isType.equal<true, FSAEventBare | ErrorFSAEventBare | ErrorFSAEventWithError, typeof beep>()
    t(isFSA(beep()))
  })

  test('event with payload creates FSA', () => {
    const beep = createFSAEvent<number>('beep')
    t(isFSA(beep({ payload: 1 })))
    t(isFSA(beep({ payload: new Error(), error: true })))
  })

  test('event with meta creates FSA', () => {
    const beep = createFSAEvent<undefined, { logs: string[] }>('beep')
    t(isFSA(beep({ meta: { logs: [] } })))
    t(isFSA(beep({ payload: new Error(), error: true, meta: { logs: [] } })))
  })

  test('event with payload and meta creates FSA', () => {
    const beep = createFSAEvent<number, { logs: string[] }>('beep')
    t(isFSA(beep({ payload: 2, meta: { logs: [] } })))
    t(isFSA(beep({ payload: new Error(), error: true, meta: { logs: [] } })))
  })

  test('error body creates error FSA', () => {
    const beep = createFSAEvent('beep')
    t(isError(beep({ payload: new Error(), error: true })))
  })

  test('error event default to no custom error', () => {
    const failedRequest = createFSAEvent('failedRequest', true)
    // note that `error: true` is not needed
    t(isError(failedRequest()))
  })

  test('error event can specify custom error', () => {
    class CustomError extends Error { }
    const event = createFSAEvent<undefined, CustomError>('err', true)
    t(isError(event({ payload: new CustomError() })))
  })

  test('error event with meta', () => {
    const event = createFSAEvent<undefined, { logs: string[] }>('fail', true)
    event({ meta: { logs: [] } })
  })

  test('error event with custom error and meta', () => {
    const event = createFSAEvent<CustomError, { logs: string[] }>('fail', true)
    event({ payload: new CustomError(), meta: { logs: [] as string[] } })
  })

  test('event has type property for internal use (during emit)', () => {
    const event = createFSAEvent('abc')
    expect(event.type).toEqual('abc')
  })

  describe('match() type guard for matching emitted event', () => {
    describe('without payload and meta', () => {
      test('normal event', () => {
        const event = createFSAEvent('event')
        const e = event()
        if (event.match(e)) {
          expect(e.type).toEqual('event')
          isType.equal<true, FSABare<string> | ErrorFSABare<string>, typeof e>()
          if (event.isError(e)) {
            const isCustom = e.payload instanceof CustomError
            isType.equal<true, boolean, typeof isCustom>()
            isType.equal<true, ErrorFSABare, typeof e>()
          }
        }
      })
      test('error event', () => {
        const event = createFSAEvent('event', true)
        const e = event({ payload: new Error() })
        if (event.match(e)) {
          expect(e.type).toEqual('event')
          isType.equal<true, ErrorFSABare<string>, typeof e>()
          if (event.isError(e)) {
            const isCustom = e.payload instanceof CustomError
            isType.equal<true, boolean, typeof isCustom>()
            isType.equal<true, ErrorFSABare<string>, typeof e>()
          }
        }
      })
      test('error event on demand', () => {
        const event = createFSAEvent('event')
        const e = event({ error: true, payload: new CustomError() })
        if (event.match(e)) {
          expect(e.type).toEqual('event')
          if (event.isError(e)) {
            const isCustom = e.payload instanceof CustomError
            isType.equal<true, boolean, typeof isCustom>()
            isType.equal<true, ErrorFSABare<string>, typeof e>()
          }
        }
      })
    })
    describe('with payload', () => {
      test('normal event', () => {
        const event = createFSAEvent<number>('event')
        const e = event({ payload: 1 })
        if (event.match(e)) {
          expect(e.type).toEqual('event')
          isType.equal<true, FSAWithPayload<string, number> | ErrorFSABare<string>, typeof e>()
          if (event.isError(e)) {
            const isCustom = e.payload instanceof CustomError
            isType.equal<true, boolean, typeof isCustom>()
            isType.equal<true, ErrorFSABare<string>, typeof e>()
          }
        }
      })
      test('error event', () => {
        const event = createFSAEvent<undefined, undefined, CustomError>('event', true)
        const e = event({ payload: new CustomError() })
        if (event.match(e)) {
          expect(e.type).toEqual('event')
          isType.equal<true, ErrorFSAWithError<string, CustomError>, typeof e>()
          if (event.isError(e)) {
            const isCustom = e.payload instanceof CustomError
            isType.equal<true, boolean, typeof isCustom>()
            isType.equal<true, ErrorFSAWithError<string, CustomError>, typeof e>()
          }
        }
      })
      test('error event on demand', () => {
        const event = createFSAEvent('event')
        const e = event({ error: true, payload: new CustomError() })
        if (event.match(e)) {
          expect(e.type).toEqual('event')
          if (event.isError(e)) {
            const isCustom = e.payload instanceof CustomError
            isType.equal<true, boolean, typeof isCustom>()
            isType.equal<true, ErrorFSA<ErrorLike, undefined, string>, typeof e>()
          }
        }
      })
    })
    test('for event with meta', () => {
      const event = createFSAEvent<undefined, { a: string }>('event')
      const e = event({ meta: { a: 'a' } })
      if (event.match(e)) {
        t.strictEqual(e.meta.a, 'a')
        isType.equal<true, FSAWithMeta<string, undefined, { a: string }>, typeof e>()
      }
    })
    test('for event with payload and meta', () => {
      const event = createFSAEvent<{ a: string }, { logs: string[] }>('event')
      const e = event({ payload: { a: 'a' }, meta: { logs: [] } })
      if (event.match(e)) {
        t.strictEqual(e.payload.a, 'a')
        isType.equal<true, FSAWithPayloadAndMeta<string, { a: string }, { logs: string[] }>, typeof e>()
      }
    })
  })
})

// test(`isError predicate to create Error FSA`, () => {
//   const mayError = createEvent<{ x: number, err?: Error }>('mayError', (payload) => !!payload.err)
//   t(!isError(mayError({ x: 1 }, undefined)))
//   t(isError(mayError({ x: 1, err: new Error() }, undefined)))
// })

// test('createScopedCreateEventFunction will create <scope>/X event', () => {
//   const createScope = createScopedCreateEvent('a')
//   const ab = createScope('x')
//   t.strictEqual(ab.type, 'a/x')
//   t(isFSA(ab(undefined, undefined)))
// })

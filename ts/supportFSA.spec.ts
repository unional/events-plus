import t from 'assert'
import { isType } from 'type-plus'
import { ErrorFSA, ErrorFSABare, FSA, isError, isFSA } from './FSA'
import { createFSAEvent } from './supportFSA'

class CustomError extends Error {
  foo() { }
}
// type DummyMeta = { logs: string[] }

describe('createFSAEvent()', () => {
  test('creates an FSA', () => {
    const beep = createFSAEvent('beep')
    t(isFSA(beep()))
  })
  test('can create an error FSA', () => {
    const beep = createFSAEvent('beep')
    t(isError(beep({ error: true })))
  })
  test('can create an error FSA with custom error', () => {
    const beep = createFSAEvent('beep')
    t(isError(beep({ payload: new CustomError(), error: true })))
  })
  test('event has a type property (used by emitter)', () => {
    const event = createFSAEvent('abc')
    expect(event.type).toEqual('abc')
  })

  describe('event.match()', () => {
    test('match empty event', () => {
      const event = createFSAEvent('event')
      const e = event()
      if (event.match(e)) {
        type E = typeof e
        isType.equal<true, FSA<string, undefined, undefined, undefined>, E>()
      }
      else {
        fail('should not reach')
      }
    })
    // test('match error event with no payload', () => {
    //   const event = createFSAEvent('event')
    //   const e = event({ error: true })
    //   if (event.match(e)) {
    //     type E = typeof e
    //     isType.equal<true, ErrorFSABare<string>, E>()
    //   }
    //   else {
    //     fail('should not reach')
    //   }
    // })
    // test('match error event with payload', () => {
    //   const event = createFSAEvent('event')
    //   const e = event({ error: true, payload: new CustomError() })
    //   if (event.match(e)) {
    //     type E = typeof e
    //     isType.equal<true, ErrorFSAWithError<string, CustomError>, E>()
    //   }
    //   else {
    //     fail('should not reach')
    //   }
    // })
    test('match unknown, which error can be Error | undefined', () => {
      const event = createFSAEvent('event')
      const e: unknown = event()
      if (event.match(e)) {
        type E = typeof e
        // in a sense the `Payload` and `Meta` should be `unknown`
        // but assume the event owner/producer knows better.
        // As long as the type matches,
        // at type level can assume the data structure matches
        isType.equal<true, FSA<string, undefined, undefined, Error | undefined>, E>()
      }
      else {
        fail('should not reach')
      }
    })
  })

  describe('event.isError()', () => {
    test('normal event is not an error', () => {
      const event = createFSAEvent('event')
      const e = event()
      if (event.isError(e)) {
        fail('should not reach')
      }
    })
    test('error event with no payload', () => {
      const event = createFSAEvent('event')
      const e = event({ error: true })
      if (event.isError(e)) {
        type E = typeof e
        isType.equal<true, ErrorFSABare<string>, E>()
      }
      else {
        fail('should not reach')
      }
    })
    // test('error event with payload', () => {
    //   const event = createFSAEvent('event')
    //   const e = event({ error: true, payload: new CustomError() })
    //   if (event.isError(e)) {
    //     type E = typeof e
    //     isType.equal<true, ErrorFSAWithError<string, CustomError>, E>()
    //   }
    //   else {
    //     fail('should not reach')
    //   }
    // })
    test('unknown, which error can be Error | undefined', () => {
      const event = createFSAEvent('event')
      const e: unknown = event({ error: true })
      if (event.isError(e)) {
        type E = typeof e
        isType.equal<true, ErrorFSA<string, undefined, Error | undefined>, E>()
      }
      else {
        fail('should not reach')
      }
    })
  })
})

// describe('createFSAEvent<Payload>()', () => {
//   test('event has Payload', () => {
//     const count = createFSAEvent<number>('count')
//     isType.equal<true, FSAEventWithPayload<string, number>, typeof count>()
//   })
//   test('creates an FSA', () => {
//     const beep = createFSAEvent<number>('beep')
//     t(isFSA(beep({ payload: 1 })))
//   })
//   test('can create an error FSA', () => {
//     const beep = createFSAEvent<number>('beep')
//     t(isError(beep({ error: true })))
//   })
//   test('can create an error FSA with custom error', () => {
//     const beep = createFSAEvent<number>('beep')
//     t(isError(beep({ payload: new CustomError(), error: true })))
//   })
//   test.todo('with CustomError type')

//   describe('event.match()', () => {
//     test('match empty event', () => {
//       const event = createFSAEvent<number>('event')
//       const e = event({ payload: 1 })
//       if (event.match(e)) {
//         type E = typeof e
//         isType.equal<true, FSA<string, number, undefined, undefined>, E>()
//       }
//       else {
//         fail('should not reach')
//       }
//     })
//     test('match error event with no payload', () => {
//       const event = createFSAEvent<number>('event')
//       const e = event({ error: true })
//       if (event.match(e)) {
//         type E = typeof e
//         isType.equal<true, ErrorFSABare<string>, E>()
//       }
//       else {
//         fail('should not reach')
//       }
//     })
//     test('match error event with payload', () => {
//       const event = createFSAEvent<number>('event')
//       const e = event({ error: true, payload: new CustomError() })
//       if (event.match(e)) {
//         type E = typeof e
//         isType.equal<true, ErrorFSAWithError<string, CustomError>, E>()
//       }
//       else {
//         fail('should not reach')
//       }
//     })
//     test('match unknown, which error can be Error | undefined', () => {
//       const event = createFSAEvent<number>('event')
//       const e: unknown = event({ payload: 1 })
//       if (event.match(e)) {
//         type E = typeof e
//         isType.equal<true, FSA<string, number, undefined, Error | undefined>, E>()
//       }
//       else {
//         fail('should not reach')
//       }
//     })
//   })

//   describe('event.isError()', () => {
//     test('normal event is not an error', () => {
//       const event = createFSAEvent<number>('event')
//       const e = event({ payload: 1 })
//       if (event.isError(e)) {
//         fail('should not reach')
//       }
//     })
//     test('error event with no payload', () => {
//       const event = createFSAEvent<number>('event')
//       const e = event({ error: true })
//       if (event.isError(e)) {
//         type E = typeof e
//         isType.equal<true, ErrorFSABare<string>, E>()
//       }
//       else {
//         fail('should not reach')
//       }
//     })
//     test('error event with payload', () => {
//       const event = createFSAEvent<number>('event')
//       const e = event({ error: true, payload: new CustomError() })
//       if (event.isError(e)) {
//         type E = typeof e
//         isType.equal<true, ErrorFSAWithError<string, CustomError>, E>()
//       }
//       else {
//         fail('should not reach')
//       }
//     })
//     test('unknown, which error can be Error | undefined', () => {
//       const event = createFSAEvent<number>('event')
//       const e: unknown = event({ payload: 1 })
//       if (event.isError(e)) {
//         type E = typeof e
//         isType.equal<true, ErrorFSA<string, undefined, Error | undefined>, E>()
//       }
//       else {
//         fail('should not reach')
//       }
//     })
//   })
// })

// describe('createFSAEvent<undefined, Meta>()', () => {
//   test('event has Meta', () => {
//     const beep = createFSAEvent<undefined, DummyMeta>('beep')
//     isType.equal<true, FSAEventWithMeta<string, DummyMeta>, typeof beep>()
//   })
//   test('creates an FSA', () => {
//     const beep = createFSAEvent<undefined, DummyMeta>('beep')
//     t(isFSA(beep({ meta: { logs: [] } })))
//   })
//   test('can create an error FSA', () => {
//     const beep = createFSAEvent<undefined, DummyMeta>('beep')
//     //? should meta be enforced for error?
//     t(isError(beep({ error: true })))
//   })
//   test('can create an error FSA with custom error', () => {
//     const beep = createFSAEvent<undefined, DummyMeta>('beep')
//     t(isError(beep({ payload: new CustomError(), error: true })))
//   })
//   test.todo('with CustomError type')

//   describe('event.match()', () => {
//     test('match empty event', () => {
//       const event = createFSAEvent<number>('event')
//       const e = event({ payload: 1 })
//       if (event.match(e)) {
//         type E = typeof e
//         isType.equal<true, FSA<string, number, undefined, undefined>, E>()
//       }
//       else {
//         fail('should not reach')
//       }
//     })
//     test('match error event with no payload', () => {
//       const event = createFSAEvent<number>('event')
//       const e = event({ error: true })
//       if (event.match(e)) {
//         type E = typeof e
//         isType.equal<true, ErrorFSABare<string>, E>()
//       }
//       else {
//         fail('should not reach')
//       }
//     })
//     test('match error event with payload', () => {
//       const event = createFSAEvent<number>('event')
//       const e = event({ error: true, payload: new CustomError() })
//       if (event.match(e)) {
//         type E = typeof e
//         isType.equal<true, ErrorFSAWithError<string, CustomError>, E>()
//       }
//       else {
//         fail('should not reach')
//       }
//     })
//     test('match unknown, which error can be Error | undefined', () => {
//       const event = createFSAEvent<number>('event')
//       const e: unknown = event({ payload: 1 })
//       if (event.match(e)) {
//         type E = typeof e
//         isType.equal<true, FSA<string, number, undefined, Error | undefined>, E>()
//       }
//       else {
//         fail('should not reach')
//       }
//     })
//   })

//   describe('event.isError()', () => {
//     test('normal event is not an error', () => {
//       const event = createFSAEvent<number>('event')
//       const e = event({ payload: 1 })
//       if (event.isError(e)) {
//         fail('should not reach')
//       }
//     })
//     test('error event with no payload', () => {
//       const event = createFSAEvent<number>('event')
//       const e = event({ error: true })
//       if (event.isError(e)) {
//         type E = typeof e
//         isType.equal<true, ErrorFSABare<string>, E>()
//       }
//       else {
//         fail('should not reach')
//       }
//     })
//     test('error event with payload', () => {
//       const event = createFSAEvent<number>('event')
//       const e = event({ error: true, payload: new CustomError() })
//       if (event.isError(e)) {
//         type E = typeof e
//         isType.equal<true, ErrorFSAWithError<string, CustomError>, E>()
//       }
//       else {
//         fail('should not reach')
//       }
//     })
//     test('unknown, which error can be Error | undefined', () => {
//       const event = createFSAEvent<number>('event')
//       const e: unknown = event({ payload: 1 })
//       if (event.isError(e)) {
//         type E = typeof e
//         isType.equal<true, ErrorFSA<string, undefined, Error | undefined>, E>()
//       }
//       else {
//         fail('should not reach')
//       }
//     })
//   })
// })

// describe('createFSAEvent<undefined, undefined, ErrorPayload>()', () => {
//   test('with CustomError type', () => {
//     const event = createFSAEvent<undefined, undefined, CustomError>('abc')
//     event()
//   })
// })
// describe('createFSAEvent<Payload, Meta>()', () => { })
// describe('createFSAEvent<Payload, undefined, ErrorPayload>()', () => { })
// describe('createFSAEvent<undefined, Meta, ErrorPayload>()', () => { })
// describe('createFSAEvent<Payload, Meta, ErrorPayload>()', () => { })

// describe('createFSAEvent<xxx>()', () => {

//   test('with Payload and Meta', () => {
//     const count = createFSAEvent<number, string>('count')
//     isType.equal<true, FSAEventWithPayloadAndMeta<string, number, string, Error | undefined>, typeof count>()
//   })

//   test('with Meta only', () => {
//     const beep = createFSAEvent<undefined, string>('beep')
//     isType.equal<true, FSAEventWithMeta<string, string, Error | undefined>, typeof beep>()
//   })

//   test('event with payload creates FSA', () => {
//     const beep = createFSAEvent<number>('beep')
//     t(isFSA(beep({ payload: 1 })))
//     t(isFSA(beep({ payload: new Error(), error: true })))
//   })

//   test('event with meta creates FSA', () => {
//     const beep = createFSAEvent<undefined, { logs: string[] }>('beep')
//     t(isFSA(beep({ meta: { logs: [] } })))
//     t(isFSA(beep({ payload: new Error(), error: true, meta: { logs: [] } })))
//   })

//   test('event with payload and meta creates FSA', () => {
//     const beep = createFSAEvent<number, { logs: string[] }>('beep')
//     t(isFSA(beep({ payload: 2, meta: { logs: [] } })))
//     t(isFSA(beep({ payload: new Error(), error: true, meta: { logs: [] } })))
//   })


//   describe('match() type guard for matching emitted event', () => {
//     describe('with payload', () => {
//       test('normal event', () => {
//         const event = createFSAEvent<number>('event')
//         const e = event({ payload: 1 })
//         if (event.match(e)) {
//           expect(e.type).toEqual('event')
//           isType.equal<true, FSAWithPayload<string, number> | ErrorFSABare<string>, typeof e>()
//           if (event.isError(e)) {
//             isType.equal<true, ErrorFSABare<string>, typeof e>()
//           }
//         }
//       })
//       test('error event on demand', () => {
//         const event = createFSAEvent('event')
//         const e = event({ error: true, payload: new CustomError() })
//         if (event.match(e)) {
//           expect(e.type).toEqual('event')
//           if (event.isError(e)) {
//             const isCustom = e.payload instanceof CustomError
//             isType.equal<true, boolean, typeof isCustom>()
//             isType.equal<true, ErrorFSA<ErrorLike, undefined, string>, typeof e>()
//           }
//         }
//       })
//     })
//     test('for event with meta', () => {
//       const event = createFSAEvent<undefined, { a: string }>('event')
//       const e = event({ meta: { a: 'a' } })
//       if (event.match(e)) {
//         t.strictEqual(e.meta.a, 'a')
//         isType.equal<true, FSAWithMeta<string, undefined, { a: string }>, typeof e>()
//       }
//     })
//     test('for event with payload and meta', () => {
//       const event = createFSAEvent<{ a: string }, { logs: string[] }>('event')
//       const e = event({ payload: { a: 'a' }, meta: { logs: [] } })
//       if (event.match(e)) {
//         t.strictEqual(e.payload.a, 'a')
//         isType.equal<true, FSAWithPayloadAndMeta<string, { a: string }, { logs: string[] }>, typeof e>()
//       }
//     })
//   })
// })

// describe('createErrorFSAEvent()', () => {

//   test('error event with custom error and meta', () => {
//     const event = createErrorFSAEvent<{ logs: string[] }, CustomError>('fail')
//     event({ payload: new CustomError(), meta: { logs: [] as string[] } })
//   })

//   test('error event creator', () => {
//     const event = createErrorFSAEvent('event')
//     const e = event({ payload: new CustomError() })
//     if (event.match(e)) {
//       expect(e.type).toEqual('event')
//       isType.equal<true, ErrorFSAWithError<string, CustomError>, typeof e>()
//       if (event.isError(e)) {
//         const isCustom = e.payload instanceof CustomError
//         isType.equal<true, boolean, typeof isCustom>()
//         isType.equal<true, ErrorFSAWithError<string, CustomError>, typeof e>()
//       }
//     }
//   })
//   test('error event', () => {
//     const event = createErrorFSAEvent('event')
//     const e = event({ payload: new Error() })
//     if (event.match(e)) {
//       expect(e.type).toEqual('event')
//       isType.equal<true, ErrorFSAWithError<string, Error>, typeof e>()
//       if (event.isError(e)) {
//         isType.equal<true, ErrorFSAWithError<string, Error>, typeof e>()
//       }
//     }
//   })

//   test('error event default to no custom error', () => {
//     const failedRequest = createErrorFSAEvent('failedRequest')
//     // note that `error: true` is not needed
//     t(isError(failedRequest()))
//   })

//   test('error event can specify custom error', () => {
//     class CustomError extends Error { }
//     const event = createErrorFSAEvent<undefined, CustomError>('err')
//     t(isError(event({ payload: new CustomError() })))
//   })

//   test('error event with meta', () => {
//     const event = createErrorFSAEvent<{ logs: string[] }>('fail')
//     event({ meta: { logs: [] } })
//   })
//   test('error event creator', () => {
//     const event = createErrorFSAEvent<number>('event')
//     isType.equal<true, ErrorFSAEventWithMeta<string, number>, typeof event>()
//     const e = event({ payload: new CustomError(), meta: 1 })
//     if (event.match(e)) {
//       expect(e.type).toEqual('event')
//       isType.equal<true, ErrorFSAWithError<string, CustomError>, typeof e>()
//       if (event.isError(e)) {
//         const isCustom = e.payload instanceof CustomError
//         isType.equal<true, boolean, typeof isCustom>()
//         isType.equal<true, ErrorFSAWithError<string, CustomError>, typeof e>()
//       }
//     }
//   })
//   test('error event on demand', () => {
//     const event = createErrorFSAEvent<undefined, CustomError>('event')
//     const e = event({ payload: new CustomError() })
//     if (event.match(e)) {
//       expect(e.type).toEqual('event')
//       isType.equal<true, ErrorFSAWithError<string, CustomError>, typeof e>()
//       if (event.isError(e)) {
//         const isCustom = e.payload instanceof CustomError
//         isType.equal<true, boolean, typeof isCustom>()
//         isType.equal<true, ErrorFSAWithError<string, CustomError>, typeof e>()
//       }
//     }
//   })
// })

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

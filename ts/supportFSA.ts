import { isError } from './FSA'
import { FSAEvent } from './FSAEvent'

// export interface FSAErrorBody<CustomError extends Error | undefined> {
//   payload?: CustomError,
//   error: true
// }

// export interface TypedFSAEvent<
//   Type extends string,
//   Payload,
//   Meta,
//   CustomError extends Error | undefined = Error | undefined> {
//   type: Type,
//   match(event: unknown): event is FSA<Type, Payload, Meta, CustomError>,
// }

// export interface FSAErrorEventWithoutPayload {

// }

// export interface FSAEventBare<
//   Type extends string>
//   extends TypedFSAEvent<Type, undefined, undefined> {
//   (): FSA<Type, undefined, undefined, undefined>,
//   (body: { error: true }): ErrorFSA<Type, undefined, undefined>,
//   <CustomError extends Error>(body: { payload: CustomError, error: true }): ErrorFSA<Type, undefined, CustomError>,
//   isError(event: { error: true }): event is ErrorFSA<Type, undefined, undefined>,
//   isError(event: unknown): event is ErrorFSA<Type>
// }

// export interface FSAEventWithPayload<
//   Type extends string,
//   Payload>
//   extends TypedFSAEvent<Type, Payload, undefined> {
//   (body: { payload: Payload }): FSA<Type, Payload>,
//   (body: { error: true }): ErrorFSA<Type, undefined, undefined>,
//   <CustomError extends Error>(body: { error: true, payload: CustomError }): ErrorFSA<Type, undefined, CustomError>,
//   isError(event: { error: true }): event is ErrorFSA<Type, undefined, undefined>,
//   isError(event: unknown): event is ErrorFSA<Type>
// }

// export interface FSAEventWithMeta<
//   Type extends string,
//   Meta>
//   extends TypedFSAEvent<Type, undefined, Meta> {
//   (body: { meta: Meta }): FSA<Type, undefined, Meta>,
//   (body: { meta: Meta, error: true }): ErrorFSA<Type, Meta, undefined>,
//   <CustomError extends Error>(body: { meta: Meta, error: true, payload: CustomError }): ErrorFSA<Type, Meta, CustomError>,
//   isError(event: { error: true }): event is ErrorFSA<Type, undefined, undefined>,
//   isError(event: unknown): event is ErrorFSA<Type>
// }

// export interface FSAEventWithPayloadAndMeta<
//   Type extends string,
//   Payload, Meta,
//   CustomError extends Error | undefined>
//   extends TypedFSAEvent<Type, Payload, Meta> {
//   (
//     body: { payload: Payload, meta: Meta } | FSAErrorBody<CustomError> & { meta: Meta }
//   ): FSA<Type, Payload, Meta, CustomError>
// }

// export interface TypedErrorFSAEvent<Type extends string> {
//   type: Type,
// }

// /**
//  * @type CustomError even it is not defined, there can still be unexpected errors.
//  * So the event will still accept an error (but no need to define the type?)
//  */
// export interface ErrorFSAEventBare<
//   Type extends string = string>
//   extends TypedErrorFSAEvent<Type> {
//   (): ErrorFSA<Type>,
//   <CustomError extends Error>(body: { payload: CustomError }): ErrorFSA<Type, undefined, CustomError>,
//   match(event: unknown): event is ErrorFSA<Type>,
//   isError(event: unknown): event is ErrorFSA<Type>
// }

// export interface ErrorFSAEventWithError<
//   Type extends string = string,
//   CustomError extends Error = Error>
//   extends TypedErrorFSAEvent<Type> {
//   (body: { payload: CustomError }): ErrorFSA<Type, undefined, CustomError>,
//   match(event: unknown): event is ErrorFSA<Type, undefined, CustomError>,
//   isError(event: unknown): event is ErrorFSA<Type, undefined, CustomError>
// }

// export interface ErrorFSAEventWithMeta<
//   Type extends string = string,
//   Meta = undefined>
//   extends TypedErrorFSAEvent<Type> {
//   (body: { meta: Meta }): ErrorFSA<Type, Meta>,
//   <CustomError extends Error>(body: { payload: CustomError, meta: Meta }): ErrorFSA<Type, Meta, CustomError>,
//   match(event: unknown): event is ErrorFSA<Type, Meta>,
//   isError(event: unknown): event is ErrorFSA<Type, Meta>
// }

// export interface ErrorFSAEventWithMetaAndError<
//   Type extends string = string,
//   Meta = undefined,
//   CustomError extends Error = Error>
//   extends TypedErrorFSAEvent<Type> {
//   (body: { payload: CustomError, meta: Meta }): ErrorFSA<Type, Meta, CustomError>,
//   match(event: unknown): event is ErrorFSA<Type, Meta, CustomError>,
//   isError(event: unknown): event is ErrorFSA<Type, Meta, CustomError>
// }


// export type FSAEvent<
//   Type extends string = string,
//   Payload = undefined,
//   Meta = undefined,
//   CustomError extends Error | undefined = Error | undefined> = (undefined extends Payload
//     ? (undefined extends Meta
//       ? FSAEventBare<Type>
//       : FSAEventWithMeta<Type, Meta>)
//     : (undefined extends Meta
//       ? FSAEventWithPayload<Type, Payload>
//       : FSAEventWithPayloadAndMeta<Type, Payload, Meta, CustomError>)
//   )

// export type ErrorFSAEvent<
//   Type extends string = string,
//   Meta = undefined,
//   CustomError extends Error | undefined = undefined> =
//   (undefined extends Meta
//     ? (CustomError extends undefined
//       ? ErrorFSAEventBare<Type>
//       : (CustomError extends Error ? ErrorFSAEventWithError<Type, CustomError> : never))
//     : (undefined extends CustomError
//       ? (CustomError extends Error ? ErrorFSAEventWithMetaAndError<Type, Meta, CustomError> : ErrorFSAEventWithMeta<Type, Meta>)
//       : (CustomError extends Error ? ErrorFSAEventWithMetaAndError<Type, Meta, CustomError> : never)))

export function createFSAEvent<
  Payload = undefined,
  Meta = undefined,
  CustomError extends Error | undefined = Error | undefined
>(type: string): FSAEvent<typeof type, Payload, Meta, CustomError> {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return Object.assign(
    function event(body?: any) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return { type, ...body }
    },
    {
      type,
      match(event: { type: string }) {
        return event.type === type
      },
      isError(event: any) {
        return isError(event)
      }
    }
  ) as any
}

// export function createErrorFSAEvent<
//   Meta = undefined,
//   CustomError extends Error | undefined = undefined
// >(type: string): ErrorFSAEvent<typeof type, Meta, CustomError> {
//   // eslint-disable-next-line @typescript-eslint/no-unsafe-return
//   return Object.assign(
//     function event(body: any) {
//       // eslint-disable-next-line @typescript-eslint/no-unsafe-return
//       return { type, ...body, error: true }
//     },
//     {
//       type,
//       match(event: any) {
//         return event.type === type
//       },
//       isError(event: any) {
//         return true
//       }
//     }
//   ) as any
// }

// import { FSA } from 'flux-standard-action'


// export interface Event<Payload, Meta> extends TypedEvent<Payload, Meta> {
//   (payload: Payload, meta: Meta): FSA<string, Payload, Meta>
// }

// function defaultIsErrorPredicate(payload: any) { return payload instanceof Error }

// export function createScopedCreateEvent(scope: string): typeof createEvent {
//   return (type) => createEvent(`${scope}/${type}`)
// }

// export function createEvent<
//   Payload = undefined,
//   Meta = undefined
// >(
//   type: string,
//   isError: ((payload: Payload) => boolean) | boolean = defaultIsErrorPredicate
// ): Event<Payload, Meta> {
//   return Object.assign(
//     (payload: Payload, meta: Meta) => {
//       return isError && (typeof isError === 'boolean' || isError(payload)) ?
//         { type, payload, meta, error: true } :
//         { type, payload, meta }
//     },
//     {
//       type,
//       match(event: { type: string }): event is FSA<string, Payload, Meta> {
//         return event.type === type
//       }
//     })
// }

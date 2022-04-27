import { ErrorFSA, ErrorFSABare, ErrorFSAWithMetaAndError, FSA, FSAWithPayloadAndMeta } from './FSA'

// TODO: need to create my own FSA and make all types compatible

export interface FSAErrorBody<CustomError extends Error = Error> {
  payload?: CustomError,
  error: true
}

export interface TypedFSAEvent<
  Type extends string,
  Payload,
  Meta,
  CustomError extends Error | undefined = Error | undefined> {
  type: Type,
  match(event: unknown): event is FSA<Type, Payload, Meta, CustomError>,
  isError(event: unknown): event is ErrorFSA<Type, Meta, CustomError>
}

export interface FSAEventBare<Type extends string = string>
  extends TypedFSAEvent<Type, undefined, undefined> {
  (): FSA<Type, undefined, undefined, undefined>,
}

export interface FSAEventWithPayload<
  Type extends string,
  Payload>
  extends TypedFSAEvent<Type, Payload, undefined> {
  <CustomError extends Error>(
    body: { payload: Payload } | FSAErrorBody<CustomError>
  ): FSA<Type, Payload, undefined, CustomError>
}

export interface FSAEventWithMeta<
  Type extends string,
  Meta>
  extends TypedFSAEvent<Type, undefined, Meta> {
  <CustomError extends Error>(
    body: { meta: Meta } | FSAErrorBody<CustomError>
  ): FSA<Type, undefined, Meta, CustomError>
}

export interface FSAEventWithPayloadAndMeta<
  Type extends string,
  Payload, Meta>
  extends TypedFSAEvent<Type, Payload, Meta> {
  <CustomError extends Error>(
    body: { payload: Payload, meta: Meta } | FSAErrorBody<CustomError>
  ): FSAWithPayloadAndMeta<Type, Payload, Meta> | ErrorFSAWithMetaAndError<Type, Meta, CustomError>
}

export interface TypedErrorFSAEvent<Type extends string> {
  type: Type,
}

export interface ErrorFSAEventBare<
  Type extends string = string,
  CustomError extends Error | undefined = Error | undefined>
  extends TypedErrorFSAEvent<Type> {
  (body?: { payload?: CustomError }): ErrorFSA<Type, undefined, CustomError>,
  match(event: unknown): event is ErrorFSA<Type>,
  isError(event: unknown): event is ErrorFSA<Type>
}

export interface ErrorFSAEventWithError<
  Type extends string = string,
  CustomError extends Error = Error>
  extends TypedErrorFSAEvent<Type> {
  (body: { payload: CustomError }): ErrorFSA<Type, undefined, CustomError>,
  match(event: unknown): event is ErrorFSA<Type, undefined, CustomError>,
  isError(event: unknown): event is ErrorFSA<Type, undefined, CustomError>
}

export interface ErrorFSAEventWithMeta<
  Type extends string = string,
  Meta = undefined>
  extends TypedErrorFSAEvent<Type> {
  (body: { meta: Meta }): ErrorFSA<Type, Meta>,
  match(event: unknown): event is ErrorFSA<Type, Meta>,
  isError(event: unknown): event is ErrorFSA<Type, Meta>
}

export interface ErrorFSAEventWithMetaAndError<
  Type extends string = string,
  Meta = undefined,
  CustomError extends Error = Error>
  extends TypedErrorFSAEvent<Type> {
  (body: { payload: CustomError, meta: Meta }): ErrorFSA<Type, Meta, CustomError>,
  match(event: unknown): event is ErrorFSA<Type, Meta, CustomError>,
  isError(event: unknown): event is ErrorFSA<Type, Meta, CustomError>
}


export type FSAEvent<
  Type extends string = string,
  Payload = undefined,
  Meta = undefined,
  CustomError extends Error | undefined = Error | undefined> = (undefined extends Payload
    ? (undefined extends Meta
      ? FSAEventBare<Type>
      : FSAEventWithMeta<Type, Meta>)
    : (undefined extends Meta
      ? FSAEventWithPayload<Type, Payload>
      : FSAEventWithPayloadAndMeta<Type, Payload, Meta>)
  ) | ErrorFSAEvent<Type, Meta, CustomError>

export type ErrorFSAEvent<
  Type extends string = string,
  Meta = undefined,
  CustomError extends Error | undefined = Error | undefined> =
  (undefined extends Meta
    ? (undefined extends CustomError
      ? (CustomError extends Error ? ErrorFSAEventWithError<Type, CustomError> : ErrorFSAEventBare<Type>)
      : (CustomError extends Error ? ErrorFSAEventWithError<Type, CustomError> : never))
    : (undefined extends CustomError
      ? (CustomError extends Error ? ErrorFSAEventWithMetaAndError<Type, Meta, CustomError> : ErrorFSAEventWithMeta<Type, Meta>)
      : (CustomError extends Error ? ErrorFSAEventWithMetaAndError<Type, Meta, CustomError> : never)))

export function createFSAEvent<
  Payload = undefined,
  Meta = undefined,
  CustomError extends Error | undefined = Error | undefined
>(type: string): FSAEvent<typeof type, Payload, Meta, CustomError>
export function createFSAEvent<
  Meta = undefined,
  CustomError extends Error | undefined = Error | undefined
>(
  type: string,
  isError: true
): ErrorFSAEvent<typeof type, Meta, CustomError>
export function createFSAEvent(
  type: string,
  isError?: true
) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return Object.assign(
    function event(body?: any) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return isError ? { type, ...body, error: true } : { type, ...body }
    },
    {
      type,
      match(event: { type: string }) {
        return event.type === type
      }
    }
  )
}

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

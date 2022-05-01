import { ErrorFSA, ErrorFSABare, ErrorFSAWithError, ErrorFSAWithMeta, ErrorFSAWithMetaAndError, FSA } from './FSA'

export interface FSAEventBase<
  Type extends string,
  Payload,
  Meta,
  ErrorPayload extends Error | undefined> {
  type: Type,
  match(event: unknown): event is FSA<Type, Payload, Meta, ErrorPayload>,
}

// #region with no param - bare
export interface FSAEventBare<
  Type extends string>
  extends FSAEventBase<Type, undefined, undefined, undefined> {
  (): FSA<Type, undefined, undefined, undefined>,
  (body: { error: true }): ErrorFSABare<Type>,
  <ErrorPayload extends Error>(body: { payload: ErrorPayload, error: true }): ErrorFSAWithError<Type, ErrorPayload>,
  isError(event: { error: true }): event is ErrorFSABare<Type>,
  isError<ErrorPayload extends Error>(event: { payload: ErrorPayload, error: true }): event is ErrorFSAWithError<Type, ErrorPayload>,
  isError(event: unknown): event is ErrorFSA<Type>
}
// #endregion

// #region with one param - Payload, Meta, or ErrorPayload
export interface FSAEventWithPayload<
  Type extends string,
  Payload>
  extends FSAEventBase<Type, Payload, undefined, undefined> {
  (body: { payload: Payload }): FSA<Type, Payload>,
  (body: { error: true }): ErrorFSABare<Type>,
  <ErrorPayload extends Error>(body: { error: true, payload: ErrorPayload }): ErrorFSA<Type, undefined, ErrorPayload>,
  isError(event: { error: true }): event is ErrorFSABare<Type>,
  isError<ErrorPayload extends Error>(event: { payload: ErrorPayload, error: true }): event is ErrorFSAWithError<Type, ErrorPayload>,
  isError(event: unknown): event is ErrorFSA<Type>
}

export interface FSAEventWithMeta<
  Type extends string,
  Meta>
  extends FSAEventBase<Type, undefined, Meta, undefined> {
  (body: { meta: Meta }): FSA<Type, undefined, Meta>,
  (body: { meta: Meta, error: true }): ErrorFSA<Type, Meta, undefined>,
  <CustomError extends Error>(body: { meta: Meta, error: true, payload: CustomError }): ErrorFSA<Type, Meta, CustomError>,
  isError(event: { meta: Meta, error: true }): event is ErrorFSAWithMeta<Type, Meta>,
  isError<ErrorPayload extends Error>(event: { payload: ErrorPayload, meta: Meta, error: true }): event is ErrorFSAWithMetaAndError<Type, Meta, ErrorPayload>,
  isError(event: unknown): event is ErrorFSA<Type, Meta>
}
export interface FSAEventWithErrorPayload<
  Type extends string,
  ErrorPayload extends Error>
  extends FSAEventBase<Type, undefined, undefined, ErrorPayload> {
  (): FSA<Type, undefined, undefined, undefined>,
  (body: { payload: ErrorPayload, error: true }): ErrorFSAWithError<Type, ErrorPayload>,
  isError(event: { payload: ErrorPayload, error: true }): event is ErrorFSAWithError<Type, ErrorPayload>,
  isError(event: unknown): event is ErrorFSA<Type, undefined, ErrorPayload>
}
// #endregion

// #region with two params
export interface FSAEventWithPayloadAndMeta<
  Type extends string,
  Payload,
  Meta>
  extends FSAEventBase<Type, Payload, Meta, undefined> {
  (body: { payload: Payload, meta: Meta }): FSA<Type, Payload, Meta, undefined>,
  (body: { meta: Meta, error: true }): ErrorFSAWithMeta<Type, Meta>,
  <ErrorPayload extends Error>(body: { payload: ErrorPayload, meta: Meta, error: true }): ErrorFSAWithMetaAndError<Type, Meta, ErrorPayload>,
  isError(event: { meta: Meta, error: true }): event is ErrorFSAWithMeta<Type, Meta>,
  isError<ErrorPayload extends Error>(event: { payload: ErrorPayload, meta: Meta, error: true }): event is ErrorFSAWithMetaAndError<Type, Meta, ErrorPayload>,
  isError(event: unknown): event is ErrorFSA<Type, Meta>
}

export interface FSAEventWithPayloadAndErrorPayload<
  Type extends string,
  Payload,
  ErrorPayload extends Error>
  extends FSAEventBase<Type, Payload, undefined, ErrorPayload> {
  (body: { payload: Payload }): FSA<Type, Payload, undefined, ErrorPayload>,
  (body: { payload: ErrorPayload, error: true }): ErrorFSAWithError<Type, ErrorPayload>,
  isError(event: { payload: ErrorPayload, error: true }): event is ErrorFSAWithError<Type, ErrorPayload>,
  isError(event: unknown): event is ErrorFSA<Type, undefined, ErrorPayload>
}


export interface FSAEventWithMetaAndErrorPayload<
  Type extends string,
  Meta,
  ErrorPayload extends Error>
  extends FSAEventBase<Type, undefined, Meta, ErrorPayload> {
  (body: { meta: Meta }): FSA<Type, undefined, Meta, ErrorPayload>,
  (body: { payload: ErrorPayload, meta: Meta, error: true }): ErrorFSAWithMetaAndError<Type, Meta, ErrorPayload>,
  isError(event: { payload: ErrorPayload, meta: Meta, error: true }): event is ErrorFSAWithMetaAndError<Type, Meta, ErrorPayload>,
  isError(event: unknown): event is ErrorFSA<Type, Meta, ErrorPayload>
}
// #endregion

// #region with all three params
export interface FSAEventWithPayloadAndMetaAndErrorPayload<
  Type extends string,
  Payload,
  Meta,
  ErrorPayload extends Error>
  extends FSAEventBase<Type, Payload, Meta, ErrorPayload> {
  (body: { payload: Payload, meta: Meta }): FSA<Type, Payload, Meta, ErrorPayload>,
  (body: { payload: ErrorPayload, meta: Meta, error: true }): ErrorFSAWithMetaAndError<Type, Meta, ErrorPayload>,
  isError(event: { payload: ErrorPayload, meta: Meta, error: true }): event is ErrorFSAWithMetaAndError<Type, Meta, ErrorPayload>,
  isError(event: unknown): event is ErrorFSA<Type, Meta, ErrorPayload>
}
// #endregion

export type FSAEvent<
  Type extends string = string,
  Payload = undefined,
  Meta = undefined,
  ErrorPayload extends Error | undefined = Error | undefined> =
  (undefined extends Payload
    ? (undefined extends Meta
      ? (ErrorPayload extends Error
        ? FSAEventWithErrorPayload<Type, ErrorPayload>
        : FSAEventBare<Type>)
      : (ErrorPayload extends Error
        ? FSAEventWithMetaAndErrorPayload<Type, Meta, ErrorPayload>
        : FSAEventWithMeta<Type, Meta>))
    : (undefined extends Meta
      ? (ErrorPayload extends Error
        ? FSAEventWithPayloadAndErrorPayload<Type, Payload, ErrorPayload>
        : FSAEventWithPayload<Type, Payload>)
      : (ErrorPayload extends Error
        ? FSAEventWithPayloadAndMetaAndErrorPayload<Type, Payload, Meta, ErrorPayload>
        : FSAEventWithPayloadAndMeta<Type, Payload, Meta>))
  )


export interface TypedErrorFSAEvent<Type extends string> {
  type: Type,
}

/**
 * @type CustomError even it is not defined, there can still be unexpected errors.
 * So the event will still accept an error (but no need to define the type?)
 */
export interface ErrorFSAEventBare<
  Type extends string = string>
  extends TypedErrorFSAEvent<Type> {
  (): ErrorFSA<Type>,
  <CustomError extends Error>(body: { payload: CustomError }): ErrorFSA<Type, undefined, CustomError>,
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
  <CustomError extends Error>(body: { payload: CustomError, meta: Meta }): ErrorFSA<Type, Meta, CustomError>,
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

export type ErrorFSAEvent<
  Type extends string = string,
  Meta = undefined,
  CustomError extends Error | undefined = undefined> =
  (undefined extends Meta
    ? (CustomError extends undefined
      ? ErrorFSAEventBare<Type>
      : (CustomError extends Error ? ErrorFSAEventWithError<Type, CustomError> : never))
    : (undefined extends CustomError
      ? (CustomError extends Error ? ErrorFSAEventWithMetaAndError<Type, Meta, CustomError> : ErrorFSAEventWithMeta<Type, Meta>)
      : (CustomError extends Error ? ErrorFSAEventWithMetaAndError<Type, Meta, CustomError> : never)))



export interface FSAType<Type extends string> {
  type: Type
}

export interface FSAPayload<Payload> {
  payload: Payload
}

export interface FSAMeta<Meta> {
  meta: Meta
}

export interface FSAError {
  error: true
}

export interface FSAErrorPayload<ErrorPayload extends Error> {
  payload: ErrorPayload
}

export interface FSAWithPayload<Type extends string, Payload>
  extends FSAType<Type>, FSAPayload<Payload> { }

export interface FSAWithMeta<Type extends string, Meta>
  extends FSAType<Type>, FSAMeta<Meta> { }

export interface FSAWithPayloadAndMeta<Type extends string, Payload, Meta>
  extends FSAType<Type>, FSAPayload<Payload>, FSAMeta<Meta> { }

export interface ErrorFSABare<Type extends string = string>
  extends FSAType<Type>, FSAError { }

export interface ErrorFSAWithMeta<Type extends string = string, Meta = undefined>
  extends ErrorFSABare<Type>, FSAMeta<Meta> { }

export interface ErrorFSAWithError<Type extends string = string, CustomError extends Error = Error>
  extends ErrorFSABare<Type>, FSAErrorPayload<CustomError> { }

export interface ErrorFSAWithMetaAndError<Type extends string = string, Meta = undefined, CustomError extends Error = Error>
  extends ErrorFSABare<Type>, FSAErrorPayload<CustomError>, FSAMeta<Meta> { }

export type ErrorFSA<
  Type extends string = string,
  Meta = undefined,
  ErrorPayload extends Error | undefined = Error | undefined> =
  (Meta extends undefined
    ? (ErrorPayload extends undefined
      ? ErrorFSABare<Type>
      : (ErrorPayload extends Error ? ErrorFSAWithError<Type, ErrorPayload> : never))
    : (ErrorPayload extends undefined
      ? ErrorFSAWithMeta<Type, Meta>
      : (ErrorPayload extends Error ? ErrorFSAWithMetaAndError<Type, Meta, ErrorPayload> : never)))

export type FSA<
  Type extends string = string,
  Payload = undefined,
  Meta = undefined,
  ErrorPayload extends Error | undefined = undefined> = (undefined extends Payload
    ? (undefined extends Meta
      ? FSAType<Type>
      : FSAWithMeta<Type, Meta>)
    : (undefined extends Meta
      ? FSAWithPayload<Type, Payload>
      : FSAWithPayloadAndMeta<Type, Payload, Meta>))
  | ErrorFSA<Type, Meta, ErrorPayload>

export { isError, isFSA } from 'flux-standard-action'

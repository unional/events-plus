

export interface FSABare<Type extends string> {
  type: Type
}

export interface FSAWithPayload<
  Type extends string,
  Payload> extends FSABare<Type> {
  payload: Payload
}

export interface FSAWithMeta<
  Type extends string,
  Meta> extends FSABare<Type> {
  meta: Meta
}

export interface FSAWithPayloadAndMeta<
  Type extends string,
  Payload,
  Meta> extends FSABare<Type> {
  payload: Payload,
  meta: Meta
}

export interface ErrorFSABare<
  Type extends string = string> {
  type: Type,
  error: true
}

export interface ErrorFSAWithMeta<
  Type extends string = string,
  Meta = undefined>
  extends ErrorFSABare<Type> {
  meta: Meta
}

export interface ErrorFSAWithError<
  Type extends string = string,
  CustomError extends Error = Error>
  extends ErrorFSABare<Type> {
  payload: CustomError
}


export interface ErrorFSAWithMetaAndError<
  Type extends string = string,
  Meta = undefined,
  CustomError extends Error = Error>
  extends ErrorFSABare<Type> {
  payload: CustomError,
  meta: Meta
}

export type ErrorFSA<
  Type extends string = string,
  Meta = undefined,
  CustomError extends Error | undefined = Error | undefined> =
  (undefined extends Meta
    ? (undefined extends CustomError
      ? ErrorFSABare<Type>
      : (CustomError extends Error ? ErrorFSAWithError<Type, CustomError> : never))
    : (undefined extends CustomError
      ? ErrorFSAWithMeta<Type, Meta>
      : (CustomError extends Error ? ErrorFSAWithMetaAndError<Type, Meta, CustomError> : never)))

// (undefined extends CustomError
//   ? (undefined extends Meta
//     ? ErrorFSABare<Type, CustomError>
//     : ErrorFSAWithMeta<Type, Meta, CustomError>)
//   : (CustomError extends Error ? (undefined extends Meta
//     ? ErrorFSAWithPayload<Type, CustomError>
//     : ErrorFSAWithPayloadAndMeta<Type, Meta, CustomError>) : never))

export type FSA<
  Type extends string = string,
  Payload = undefined,
  Meta = undefined,
  CustomError extends Error | undefined = undefined> = (undefined extends Payload
    ? (undefined extends Meta
      ? FSABare<Type>
      : FSAWithMeta<Type, Meta>)
    : (undefined extends Meta
      ? FSAWithPayload<Type, Payload>
      : FSAWithPayloadAndMeta<Type, Payload, Meta>))
  | ErrorFSA<Type, Meta, CustomError>

export { isError, isFSA } from 'flux-standard-action'

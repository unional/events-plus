import { justEvent } from './index.js'

it('defaults to no value, no meta', () => {
  const empty = justEvent('empty')
  expect(empty.type).toBe('empty')

  empty() // call without params
})

it('can type Value using generics', () => {
  const event = justEvent<string>('horn')
  const e = event('beep')
  expect(e[0]).toBe('beep')
})

it('can type Value and Meta using generics', () => {
  const withLog = justEvent<undefined, { logs: string[] }>('with-log')
  const e = withLog(undefined, { logs: ['new log'] })
  expect(e[1].logs).toEqual(['new log'])
})

it('can define a default listener', () => {
  let called = false
  const notify = justEvent('notify', () => called = true)
  notify.defaultListener()

  expect(called).toBe(true)
})

it('can define default listener with value', () => {
  let actual: string
  const echo = justEvent('echo', (value: string) => actual = value)

  echo.defaultListener('hello')
  expect(actual!).toBe('hello')
})

it('can define default listener with optional value', () => {
  let actual: string | undefined
  const echo = justEvent('echo', (value?: string) => actual = value)

  echo.defaultListener('hello')
  expect(actual!).toBe('hello')
})

it('can define default listener with value and meta', () => {
  let actual: any
  const add = justEvent('add', ([a, b]: [number, number], meta: { logs: string[] }) => {
    actual = {
      input: [a, b],
      output: a + b,
      meta: { logs: [...meta.logs, `adding ${a} + ${b}`] }
    }
  })
  add.defaultListener([1, 2], { logs: [] })

  expect(actual).toEqual({
    input: [1, 2],
    output: 3,
    meta: { logs: ['adding 1 + 2'] }
  })
})

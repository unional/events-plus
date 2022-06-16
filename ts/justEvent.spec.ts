import { justEvent } from './index.js'

it('defaults to no value, no meta', () => {
  const empty = justEvent('empty')
  expect(empty.type).toBe('empty')

  empty() // call without params
})

it('with value', () => {
  const event = justEvent<string>('horn')
  const e = event('beep')
  expect(e[0]).toBe('beep')
})

it('with meta', () => {
  const log = justEvent<undefined, { logs: string[] }>('with-log')
  const e = log(undefined, { logs: ['new log'] })
  expect(e[1].logs).toEqual(['new log'])
})

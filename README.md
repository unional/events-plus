# @unional/events-plus <!-- omit in toc -->

[![NPM version][npm-image]][npm-url]
[![NPM downloads][downloads-image]][downloads-url]

[![GitHub NodeJS][github-nodejs]][github-action-url]
[![Codecov][codecov-image]][codecov-url]

[![Semantic Release][semantic-release-image]][semantic-release-url]

[![Visual Studio Code][vscode-image]][vscode-url]

Provides additional features to event emitters.

Should support any event emitters.
Tested with the following:

- [events]
- [eventemitter2]
- [eventemitter3]
- [fbemitter]
- [EventTarget]

## Installation <!-- omit in toc -->

```sh
# npm
npm install @unional/events-plus

# yarn
yarn add @unional/events-plus

# pnpm
pnpm install @unional/events-plus

#rush
rush add -p @unional/events-plus
```

## features <!-- omit in toc -->

- [JustEvent](#justevent)
- [trapError](#traperror)

### JustEvent

[`justEvent()`] creates typed event with [just-func] semantics.
It makes consuming and emitting events with parameters much easier.

```ts
import { justEvent } from '@unional/events-plus'
import { EventEmitter } from 'EventEmitter3'

const count = justEvent<number>('count')
const emitter = new EventEmitter()

emitter.addListener(count.type, count.listener(value => expect(value).toBe(1)))

emitter.emit(count.type, ...count(1))

// or
count.listenTo(emitter, value => expect(value).toBe(1))
count.emitBy(emitter, 1)
```

You can also create the event with a default listener:

```ts
import { justEvent } from '@unional/events-plus'
import { EventEmitter } from 'EventEmitter3'

let total = 0
const sum = justEvent('sum', (value: number) => total +=value)

const emitter = new EventEmitter()
emitter.addListener(sum.type, sum.defaultListener)
```

### trapError

[`trapError()`] will trap any error thrown in the listener and emit it to the `logger`.
This prevents the emitter workflow interrupted by rouge listeners.

The `logger` is defaulted to `console.error()`,
but you can override that to anything else.

```ts
import { trapError } from '@unional/events-plus'
import { EventEmitter } from 'events'

const emitter = trapError(new EventEmitter()) // or `trapError(emitter, { logger })`
emitter.on('work', () => { throw new Error('missed deadline') })
emitter.emit('work') // no error is thrown.
```

`errorTrapper()` creates your own `trapError()` with specific `logger`
You can then use it on multiple emitters.

```ts
import { errorTrapper } from '@unional/events-plus'
import { EventEmitter } from 'eventemitter3'
import { getLogger } from 'standard-log'

const yourTrapError = errorTrapper(getLogger('emitter'))
const emitter = yourTrapError(new EventEmitter())
...
```

[`justEvent()`]: https://github.com/unional/events-plus/blob/main/ts/justEvent.ts
[`trapError()`]: https://github.com/unional/events-plus/blob/main/ts/trapError.ts
[codecov-image]: https://codecov.io/gh/unional/events-plus/branch/master/graph/badge.svg
[codecov-url]: https://codecov.io/gh/unional/events-plus
[downloads-image]: https://img.shields.io/npm/dm/@unional/events-plus.svg?style=flat
[downloads-url]: https://npmjs.org/package/@unional/events-plus
[eventemitter2]: https://www.npmjs.com/package/eventemitter2
[eventemitter3]: https://www.npmjs.com/package/eventemitter3
[events]: https://www.npmjs.com/package/events
[EventTarget]: https://developer.mozilla.org/en-US/docs/Web/API/EventTarget
[fbemitter]: https://www.npmjs.com/package/fbemitter
[github-action-url]: https://github.com/unional/events-plus/actions
[github-nodejs]: https://github.com/unional/events-plus/workflows/nodejs/badge.svg
[just-func]: https://github.com/justland/just-func-typescript
[npm-image]: https://img.shields.io/npm/v/@unional/events-plus.svg?style=flat
[npm-url]: https://npmjs.org/package/@unional/events-plus
[semantic-release-image]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-release-url]: https://github.com/semantic-release/semantic-release
[vscode-image]: https://img.shields.io/badge/vscode-ready-green.svg
[vscode-url]: https://code.visualstudio.com/

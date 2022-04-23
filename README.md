# @unional/events-plus <!-- omit in toc -->

[![NPM version][npm-image]][npm-url]
[![NPM downloads][downloads-image]][downloads-url]

[![GitHub NodeJS][github-nodejs]][github-action-url]
[![Codecov][codecov-image]][codecov-url]

[![Semantic Release][semantic-release-image]][semantic-release-url]

[![Visual Studio Code][vscode-image]][vscode-url]

Provides additional features to event emitters.

Supports the following emitters:

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

- [trapError](#traperror)

### trapError

[`trapError()`] will trap any error thrown in the listener and emit it to the `logger`.
This prevents the emitter workflow interrupted by rouge listeners.

The `logger` is defaulted to `console.error()`,
but you can override that to anything else.

```ts
import { EventEmitter } from 'events'
import { trapError } from 'events-plus'

const emitter = trapError(new EventEmitter())
emitter.on('work', () => { throw new Error('missed deadline') })
emitter.emit('work') // no error is thrown.
```

`errorTrapper()` creates your own `trapError()` with specific `logger`
You can then use it on multiple emitters.

```ts
import { EventEmitter } from 'eventemitter3'
import { errorTrapper } from 'events-plus'
import { getLogger } from 'standard-log'

const yourTrapError = errorTrapper(getLogger('emitter'))
const emitter = yourTrapError(new EventEmitter())
...
```

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
[npm-image]: https://img.shields.io/npm/v/@unional/events-plus.svg?style=flat
[npm-url]: https://npmjs.org/package/@unional/events-plus
[semantic-release-image]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-release-url]: https://github.com/semantic-release/semantic-release
[TypeScript]: https://www.typescriptlang.org
[vscode-image]: https://img.shields.io/badge/vscode-ready-green.svg
[vscode-url]: https://code.visualstudio.com/

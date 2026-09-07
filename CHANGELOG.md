# @unional/events-plus

## 4.0.0

### Major Changes

- 96f0a82: Widen `@just-func/types` from `^0.5.1` to `^0.6.0`.
  
  A caret range on a `0.x` version cannot cross a minor boundary, so `^0.5.1` was
  permanently stuck on `@just-func/types@0.5.x`, which depends on `type-plus@^5.0.0`.
  That meant every consumer of `@unional/events-plus` resolved a transitive
  `type-plus@5.6.0` in their tree, alongside whatever newer type-plus version their
  other first-party dependencies pulled in.
  
  `@just-func/types@0.6.0` depends on `type-plus@8.0.0-beta.10`. Widening the range
  lets consumers actually reach it, removing the stale transitive `type-plus@5.6.0`
  from their dependency tree.
  
  This is a major bump, not minor, because `@just-func/types`' `JustDuo`, `JustEmpty`,
  `JustMeta` and `JustUno` types are imported directly into `ts/justEvent.ts` and leak
  into the emitted `.d.ts` files (`esm/justEvent.d.ts`, `cjs/justEvent.d.ts`, and the
  package's public `index.d.ts` re-exports that build on them). Consumers pick up
  `@just-func/types@0.6.0`'s types — built against `type-plus@8.0.0-beta.10` — through
  those public type surfaces, and `type-plus@8` also introduces a new
  `typescript >= 5.6.0` peer dependency that consumers now inherit as well.

## 3.0.3

### Patch Changes

- b209abd: Use the `node:` protocol for Node builtin imports.
  
  `ts/trapErrorTest.ts` imported `assert` and three files imported `events`
  without the prefix. The prefix is what distinguishes a Node builtin from a
  same-named package on the registry, so an unprefixed import resolves to whichever
  the resolver finds first.
  
  Behaviour is unchanged on every supported Node — `node:` specifiers have worked
  in both `import` and `require` since Node 16 — but the emitted `cjs/` and
  `esm/` output changes, hence the patch.
  
  Surfaced by raising `useNodejsImportProtocol` from `info` to `error` in
  `@repobuddy/biome`, where it had been reporting and exiting 0.

## 3.0.2

### Patch Changes

- f41a702: Rebuild with tsdown instead of the three `tsc -p` passes. The public API, the
  entry points and the published file list are unchanged; the emitted JavaScript
  differs because it now comes from a different compiler, and the re-export-only
  `index` no longer ships a sourcemap that mapped nothing.

## 3.0.1

### Patch Changes

- 7432420: Point `repository`, `homepage` and `bugs` at `cyberuni/events-plus`.

  `repository` is read when generating provenance attestations, so it has to be correct at
  publish time — not merely correct in the repo.

# [3.0.0](https://github.com/unional/events-plus/compare/v2.2.5...v3.0.0) (2022-12-11)

### Bug Fixes

- update deps ([b4f5821](https://github.com/unional/events-plus/commit/b4f5821841bcd59b4a0bce7d9f57b6afd868e690))

### BREAKING CHANGES

- CJS transpile to ES2015 instead of ES5

use @repobuddy/jest

## [2.2.5](https://github.com/unional/events-plus/compare/v2.2.4...v2.2.5) (2022-11-20)

### Bug Fixes

- **deps:** update dependency @just-func/types to ^0.5.0 ([#34](https://github.com/unional/events-plus/issues/34)) ([809f4e8](https://github.com/unional/events-plus/commit/809f4e89316dc20714fef41f3c6015e79569c7a3))

## [2.2.4](https://github.com/unional/events-plus/compare/v2.2.3...v2.2.4) (2022-10-09)

### Bug Fixes

- **deps:** update dependency @just-func/types to ^0.4.0 ([#31](https://github.com/unional/events-plus/issues/31)) ([8c9cf92](https://github.com/unional/events-plus/commit/8c9cf9294a65898417a246df15f24bbc0389ceb0))

## [2.2.3](https://github.com/unional/events-plus/compare/v2.2.2...v2.2.3) (2022-10-09)

### Bug Fixes

- **deps:** update dependency @just-func/types to ^0.3.0 ([#30](https://github.com/unional/events-plus/issues/30)) ([05a6c39](https://github.com/unional/events-plus/commit/05a6c399d41b1969bff45b5310461f6f40632189))

## [2.2.2](https://github.com/unional/events-plus/compare/v2.2.1...v2.2.2) (2022-10-03)

### Bug Fixes

- commonjs package.json ([a014c6b](https://github.com/unional/events-plus/commit/a014c6b0b9b00ca01953841208dd52f8af2311f1))

## [2.2.1](https://github.com/unional/events-plus/compare/v2.2.0...v2.2.1) (2022-06-28)

### Bug Fixes

- support default listener with optional param ([fe30090](https://github.com/unional/events-plus/commit/fe30090564a0019b3484750838e42f60eadbaa49))

# [2.2.0](https://github.com/unional/events-plus/compare/v2.1.0...v2.2.0) (2022-06-22)

### Features

- add default event listener ([4bd5631](https://github.com/unional/events-plus/commit/4bd563123f0cdc93a89160ebc446e08406bf5447))

# [2.2.0](https://github.com/unional/events-plus/compare/v2.1.0...v2.2.0) (2022-06-22)

### Features

- add default event listener ([4bd5631](https://github.com/unional/events-plus/commit/4bd563123f0cdc93a89160ebc446e08406bf5447))

# [2.1.0](https://github.com/unional/events-plus/compare/v2.0.1...v2.1.0) (2022-06-16)

### Features

- add ESM support ([837bbb2](https://github.com/unional/events-plus/commit/837bbb27e2a4f5786a95e59c8869404695b08a55))

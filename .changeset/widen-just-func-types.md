---
"@unional/events-plus": major
---

Widen `@just-func/types` from `^0.5.1` to `^0.6.0`.

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

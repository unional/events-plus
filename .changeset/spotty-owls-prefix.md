---
'@unional/events-plus': patch
---

Use the `node:` protocol for Node builtin imports.

`ts/trapErrorTest.ts` imported `assert` and three files imported `events`
without the prefix. The prefix is what distinguishes a Node builtin from a
same-named package on the registry, so an unprefixed import resolves to whichever
the resolver finds first.

Behaviour is unchanged on every supported Node — `node:` specifiers have worked
in both `import` and `require` since Node 16 — but the emitted `cjs/` and
`esm/` output changes, hence the patch.

Surfaced by raising `useNodejsImportProtocol` from `info` to `error` in
`@repobuddy/biome`, where it had been reporting and exiting 0.

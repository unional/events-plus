---
'@unional/events-plus': patch
---

Rebuild with tsdown instead of the three `tsc -p` passes. The public API, the
entry points and the published file list are unchanged; the emitted JavaScript
differs because it now comes from a different compiler, and the re-export-only
`index` no longer ships a sourcemap that mapped nothing.

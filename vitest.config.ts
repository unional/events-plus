import { defineConfig } from 'vitest/config'

export default defineConfig({
	test: {
		// `test`, `it`, `describe` and `expect` stay global, as they were under jest,
		// so the spec files need no per-file imports.
		globals: true,
		// The `.spec16.ts` suffix dates from a jest config that skipped those files on
		// Node < 16; `EventTarget` and `Event` have been Node globals since v15, so the
		// node environment now covers what the jsdom jest project used to.
		environment: 'node',
		include: ['ts/**/*.spec.ts', 'ts/**/*.spec16.ts'],
		coverage: {
			provider: 'v8',
			include: ['ts/**/*.ts'],
			exclude: ['ts/**/*.spec.ts', 'ts/**/*.spec16.ts', 'ts/trapErrorTest.ts'],
			reporter: ['text', 'lcov'],
			// Pinned at what the suite covers today so a drop fails the build instead
			// of quietly showing up in a report nobody reads.
			thresholds: {
				branches: 71,
				functions: 100,
				lines: 100,
				statements: 93
			}
		}
	}
})

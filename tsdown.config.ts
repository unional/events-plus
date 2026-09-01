import { writeFile } from 'node:fs/promises'
import { defineConfig } from 'tsdown'

const entry = ['ts/index.ts']

// Two outputs, each pinned to the path it already publishes at, so replacing the
// `tsc -p` passes with tsdown stays invisible to consumers:
//   cjs/ — the CommonJS build, marked commonjs by its own package.json, and the
//          target of both `main` and `types`
//   esm/ — the ESM build reached through the `import` condition
//
// The former `tslib/` output was built but never listed in `files`, so it has
// never shipped. It existed only for the size-limit check that went with it.
export default defineConfig([
	{
		entry,
		format: 'cjs',
		outDir: 'cjs',
		outExtensions: () => ({ js: '.js', dts: '.d.ts' }),
		dts: true,
		sourcemap: true,
		target: 'es2015',
		// Mirror the source tree rather than bundling, so the output keeps the
		// per-module shape tsc used to emit and the published file list is unchanged.
		unbundle: true,
		hooks: {
			// The package root is `"type": "module"`, so cjs/index.js is only read as
			// CommonJS because of this marker. tsdown's `copy` treats `to` as a
			// directory, which is why this is written rather than copied.
			'build:done': () => writeFile('cjs/package.json', '{"type":"commonjs"}\n')
		}
	},
	{
		entry,
		format: 'esm',
		outDir: 'esm',
		outExtensions: () => ({ js: '.js', dts: '.d.ts' }),
		dts: true,
		sourcemap: true,
		target: 'es2019',
		unbundle: true
	}
])

const nodeMajorVersion = parseInt(process.version.slice(1, process.version.indexOf('.')), 10)
const testMatch = [''].concat([14, 16].filter(v => v <= nodeMajorVersion))
  .map(v => `**/?(*.)+(spec|test|integrate|accept|system|unit)${v}.[jt]s?(x)`)

module.exports = {
  preset: 'ts-jest/presets/default-esm',
  globals: {
    'ts-jest': {
      isolatedModules: true,
      useESM: true,
    },
  },
  collectCoverageFrom: ['<rootDir>/ts/**/*.[jt]s'],
  moduleNameMapper: {
    // remove the phantom `.js` extension
    '^(\\.{1,2}/.*)\\.js$': '$1',
    // If dependency doing `import ... from '#<pkg>'.
    // e.g. `chalk` has this: `import ... form '#ansi-styles'`
    '#(.*)': '<rootDir>/node_modules/$1'
  },
  roots: ['<rootDir>/ts'],
  testMatch,
  transform: {
    // use `babel-jest` to transpile js files
    // can probably improve this by just doing `.js|mjs` in the `node_modules` folder.
    '^.+\\.(js|jsx|mjs)$': 'babel-jest',
  },
  watchPlugins: [
    'jest-watch-suspend',
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
    ['jest-watch-toggle-config', { 'setting': 'verbose' }],
    ['jest-watch-toggle-config', { 'setting': 'collectCoverage' }]
  ]
}

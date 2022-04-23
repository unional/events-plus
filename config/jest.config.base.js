const nodeMajorVersion = parseInt(process.version.slice(1, process.version.indexOf('.')), 10)
const testMatch = [''].concat([14, 16].filter(v => v <= nodeMajorVersion))
  .map(v => `**/?(*.)+(spec|test|integrate|accept|system|unit)${v}.[jt]s?(x)`)


  module.exports = {
  'collectCoverageFrom': [
    '<rootDir>/ts/**/*.[jt]s'
  ],
  'reporters': [
    'default',
    'jest-progress-tracker'
  ],
  'roots': [
    '<rootDir>/ts',
  ],
  testMatch,
  'watchPlugins': [
    'jest-watch-suspend',
    'jest-watch-repeat',
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
    [
      'jest-watch-toggle-config', { 'setting': 'verbose' },
    ],
    [
      'jest-watch-toggle-config', { 'setting': 'collectCoverage' },
    ],
  ],
}

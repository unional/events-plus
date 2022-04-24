module.exports = {
  'collectCoverageFrom': [
    '<rootDir>/ts/**/*.[jt]s'
  ],
  projects: [
    './jest.config.node.js',
    './jest.config.jsdom.js'
  ],
  'testMatch': ['**/?(*.)+(spec|test|integrate|accept|system|unit).[jt]s?(x)'],
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

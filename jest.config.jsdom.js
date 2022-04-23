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
  'testEnvironment': 'jsdom',
  'testMatch': ['**/?(*.)+(spec|test|integrate|accept|system|unit).jsdom.[jt]s?(x)'],
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

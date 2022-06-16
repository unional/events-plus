const base = require('./config/jest.config.base.cjs')

module.exports = {
  ...base,
  displayName: 'jsdom',
  testEnvironment: 'jsdom',
}

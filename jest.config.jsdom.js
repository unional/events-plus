const base = require('./config/jest.config.base')

module.exports = {
  ...base,
  displayName: 'jsdom',
  testEnvironment: 'jsdom',
}

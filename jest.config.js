const base = require('./config/jest.config.base')

module.exports = {
  ...base,
  testEnvironment: 'node'
}

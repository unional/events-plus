const { defineWatchPlugins } = require('@repobuddy/jest');

module.exports = {
  projects: [
    './jest.config.node.cjs',
    './jest.config.jsdom.cjs'
  ],
  ...defineWatchPlugins()
}

var path = require('path')
function resolve(dir) {
  return path.join(__dirname, '.', dir)
}
process.env.VUE_CLI_BABEL_TARGET_NODE = true
process.env.VUE_CLI_BABEL_TRANSPILE_MODULES = true

module.exports = {
  assetsDir: 'static',
  lintOnSave: false,
  productionSourceMap: false,
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src'),
        '@u': resolve('src/utils')
      },
    }
  }
}
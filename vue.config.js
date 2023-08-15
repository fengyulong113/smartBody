const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}

const port = 8080

module.exports = {
  publicPath: "./",
  outputDir: "dist",
  assetsDir: "static",
  lintOnSave: false,
  productionSourceMap: false,
  devServer: {
    port: port,
    open: false,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      'api': {
        // target: 'http://192.168.130.28:6099/base',
        // target: 'http://192.168.35.181:6009/base',
        // target: 'http://localhost:6009/base',
        target: 'http://192.168.169.181:6099/base',
        // target: 'http://172.168.0.203:6009/base',
        ws: true,
        pathRewrite: {
          '^/api': '/'
        }
      }
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src')
      }
    },
  },
  chainWebpack(config) {
    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  }

}
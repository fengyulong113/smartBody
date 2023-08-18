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
      'base': {
        target: 'http://192.168.169.28:6099/base',
        ws: true,
        pathRewrite: {
          '^/base': '/'
        }
      },
      'dict': {
        target: 'http://192.168.169.28:8089/ai',
        ws: true,
        pathRewrite: {
          '^/dict': '/'
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
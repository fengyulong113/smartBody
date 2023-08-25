/*
 * @Description:
 * @Author: luqiang
 * @Date: 2023-08-21 15:05:16
 * @LastEditTime: 2023-08-21 16:47:49
 * @LastEditors: luqiang
 */
const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}

const port = 8080;

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
      errors: true,
    },
    proxy: {
      'base': {
        // target: 'http://192.168.169.181:6099/base',
        target: 'http://172.168.0.123:6099/base',
        ws: true,
        pathRewrite: {
          '^/base': '/'
        }
      },
      'script': {
        target: 'http://192.168.169.181:6010',
        ws: true,
        pathRewrite: {
          '^/script': '/'
        }
      },
      'dict': {
        target: 'http://172.168.0.123:8089/ai',
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
        "@": resolve("src"),
      },
    },
  },
  chainWebpack(config) {
    // set svg-sprite-loader
    config.module.rule("svg").exclude.add(resolve("src/icons")).end();
    config.module
      .rule("icons")
      .test(/.svg$/)
      .include.add(resolve("src/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]",
      })
      .end();
  },
};

const CopyWebpackPlugin = require('copy-webpack-plugin');
// 引入等比适配插件
const px2rem = require('postcss-px2rem')

// 配置基本大小
const postcss = px2rem({
  // 基准大小 baseSize，需要和rem.js中相同
  remUnit: 16
})
module.exports = {
  lintOnSave: true,
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          postcss
        ]
      }
    }
  },
  chainWebpack: config => {
    config.module.rule('svg-sprite').use('svgo-loader').loader('svgo-loader');

  },
  devServer: {
    /* 自动打开浏览器 */
    open: false,
    /* 设置为0.0.0.0则所有的地址均能访问 */
    host: '0.0.0.0',
    port: 8082,
    https: false,
    hotOnly: false,
    /* 使用代理 */
    proxy: {
      '/api': {
        /* 目标代理服务器地址 */
        target: 'http://192.168.0.113:8085',
        /* 允许跨域 */
        changeOrigin: true,
        pathRewrite: {   //重写路径 比如'/api/aaa/ccc'重写为'/aaa/ccc'
          '^/api': ''
        }
      },
      '/xpi': {
        target: 'http://sxboyu.iok.la:82',
       // target: 'http://192.168.0.113:81',
        changeOrigin: true,  //允许跨域
        pathRewrite: {
          '^/xpi': '/'  // rewrite path
        }
      },
      '/cma': {
        target: 'http://219.145.1.28:85/link',
        changeOrigin: true,  //允许跨域
        pathRewrite: {
          '^/cma': '/'  // rewrite path
        }
      },
      '/weather': {
        target: "https://tianqiapi.com/api",  //天气接口跨域
        pathRewrite: {
          '^/weather': '/'
        },
        changeOrigin: true,
      },
    },
  },
  publicPath:'./',
  pluginOptions: {
    svgSprite: {
      /*
       * The directory containing your SVG files.
       */
      dir: 'src/assets/icons',
      /*
       * The reqex that will be used for the Webpack rule.
       */
      test: /\.(svg)(\?.*)?$/,
      /*
       * @see https://github.com/kisenka/svg-sprite-loader#configuration
       */
      loaderOptions: {
        extract: true,
        spriteFilename: 'img/icons.[hash:8].svg' // or 'img/icons.svg' if filenameHashing == false
      },
      /*
       * @see https://github.com/kisenka/svg-sprite-loader#configuration
       */
      pluginOptions: {
        plainSprite: true
      }
    }
  },
  configureWebpack: {
    plugins: [
      new CopyWebpackPlugin([
        { from: 'node_modules/@liveqing/liveplayer/dist/component/crossdomain.xml'},
        { from: 'node_modules/@liveqing/liveplayer/dist/component/liveplayer-lib.min.js', to: 'js/'},
        { from: 'node_modules/@liveqing/liveplayer/dist/component/liveplayer.swf'}
      ]),

    ]
  }
}

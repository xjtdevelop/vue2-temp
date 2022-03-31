const path = require('path')
const IS_PROD = ['production'].includes(process.env.NODE_ENV)
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin // 打包分析
const { proxy } = require('./conf/proxy')

// gzip --start
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzip = true // 是否使用gzip
const productionGzipExtensions = ['js', 'css'] // 需要gzip压缩的文件后缀
// gzip --end

const TerserPlugin = require('terser-webpack-plugin') // 去掉注释

function resolve(dir) {
  return path.join(__dirname, './', dir)
}

module.exports = {
  devServer: {
    host: '0.0.0.0', // 允许外部访问本地开发服务器，以方便联调
    hot: true,
    open: true, // 开发服务器启动时，打开浏览器
    proxy,
  },
  publicPath: '/', // 默认'/'，部署应用包时的基本 URL
  outputDir: 'dist',
  assetsDir: '', // 相对于outputDir的静态资源(js、css、img、fonts)目录
  runtimeCompiler: true, // 是否使用包含运行时编译器的 Vue 构建版本
  productionSourceMap: false, // 生产环境的 source map
  lintOnSave: !IS_PROD,
  configureWebpack: () => {
    const myConfig = {}
    if (IS_PROD) {
      // // 1. 生产环境npm包转CDN
      // myConfig.externals = externals

      myConfig.plugins = []
      // gzip
      // 2. 构建时开启gzip，降低服务器压缩对CPU资源的占用，服务器也要相应开启gzip
      productionGzip &&
        myConfig.plugins.push(
          new CompressionWebpackPlugin({
            test: new RegExp(
              '\\.(' + productionGzipExtensions.join('|') + ')$'
            ),
            threshold: 8192,
            minRatio: 0.8,
          })
        )
      // 去掉注释
      myConfig.plugins.push(
        new TerserPlugin({
          terserOptions: {
            ie8: true,
            warnings: true,
            output: {
              comments: false,
              beautify: false,
            },
            compress: {
              drop_console: true,
              pure_funcs: ['console.log'], //移除console
            },
          },
        })
      )
      myConfig['performance'] = {
        //打包文件大小配置
        maxEntrypointSize: 10000000,
        maxAssetSize: 30000000,
      }
    } else {
      myConfig.devtool = 'source-map'
    }
    return myConfig
  },

  chainWebpack: config => {
    config.output
      .filename('[name].[hash].js')
      .chunkFilename('chunks/[name].[hash].js')

    // 压缩图片
    config.module
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      .tap(options => Object.assign(options, { limit: 20000 }))

    // 打包分析
    if (process.env.IS_ANALYZ) {
      config.plugin('webpack-report').use(BundleAnalyzerPlugin, [
        {
          analyzerMode: 'static',
        },
      ])
    }

    // svg loader
    const svgRule = config.module.rule('svg') // 找到svg-loader
    svgRule.uses.clear() // 清除已有的loader, 如果不这样做会添加在此loader之后
    svgRule.exclude.add(/node_modules/) // 正则匹配排除node_modules目录
    svgRule // 添加svg新的loader处理
      .test(/\.svg$/)
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]',
      })

    // 修改images loader 添加svg处理
    const imagesRule = config.module.rule('images')
    imagesRule.exclude.add(resolve('src/icons'))
    config.module.rule('images').test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
    return config
  },
}

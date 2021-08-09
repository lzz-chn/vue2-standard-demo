const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)

module.exports = {
  publicPath: process.env.VUE_APP_PUBLIC_PATH,
  css: { extract: false },
  configureWebpack: (config) => {
    config.optimization = {
      splitChunks: {
        cacheGroups: {
          common: {
            name: 'chunk-common',
            chunks: 'initial',
            minChunks: 2,
            maxInitialRequests: 5,
            minSize: 0,
            priority: 1,
            reuseExistingChunk: true,
            enforce: true
          },
          vendors: {
            name: 'chunk-vendors',
            test: /[\\/]node_modules[\\/]/,
            chunks: 'initial',
            priority: 2,
            reuseExistingChunk: true,
            enforce: true
          }
        }
      }
    }
    config.plugins = [...config.plugins]
    config.devtool = 'source-map'
  },
  productionSourceMap: !IS_PROD, // 生产环境是否生成 sourceMap 文件
  lintOnSave: !IS_PROD,
  devServer: {
    overlay: {
      warnings: false,
      errors: true
    }
  }
}

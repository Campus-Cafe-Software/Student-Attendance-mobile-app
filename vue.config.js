module.exports = {
//    build: {
//        assetsPublicPath: '/cafeweb/mobile/',
//        assetsSubDirectory: 'static'
//      }

    chainWebpack: config => {
        config.plugins.delete('prefetch')
    }

  }
module.exports = {
//    build: {
//        assetsPublicPath: '/cafeweb/mobile/',
//        assetsSubDirectory: 'static'
//      }

    chainWebpack: config => {
        config.plugins.delete('prefetch')
    },

    publicPath: process.env.NODE_ENV === 'production' ? '/cafeweb/mobile/' : '/cafeweb/mobile/'

  }
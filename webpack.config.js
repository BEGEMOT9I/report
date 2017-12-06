const Config = require('webpack-config').default

module.exports = new Config().extend('config/webpack.[NODE_ENV].js')

const Webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const config = require('./webpack.config')

new WebpackDevServer(Webpack(config), {
  publicPath: '/',
  hot: true,
  inline: true,
  historyApiFallback: true
}).listen(3000, '0.0.0.0', function(err) {
  if (err) {
    return console.log(err) // eslint-disable-line no-console
  }

  console.log('Listening at http://localhost:3000/') // eslint-disable-line no-console
  console.log('NODE_ENV=[' + process.env.NODE_ENV + ']') // eslint-disable-line no-console
})

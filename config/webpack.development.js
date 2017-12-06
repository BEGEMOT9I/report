const path = require('path')
const webpack = require('webpack')
const Config = require('webpack-config').default

const config = new Config().extend('config/webpack.base.js').merge({
  entry: {
    client: [
      'babel-polyfill',
      'whatwg-fetch',
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://0.0.0.0:3000',
      'webpack/hot/only-dev-server',
      './src/startup/application'
    ]
  },
  resolve: {
    alias: {
      'react/lib/ReactMount': 'react-dom/lib/ReactMount'
    }
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 2,
              localIdentName: '[name]__[local]__[hash:base64:5]'
            }
          },
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[name]__[local]__[hash:base64:5]'
            }
          },
          'postcss-loader'
        ]
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.SourceMapDevToolPlugin({
      filename: '[file].map'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('developement')
      }
    })
  ],
  devtool: 'source-map'
})

module.exports = config

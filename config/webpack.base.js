const path = require('path')
const webpack = require('webpack')
const Config = require('webpack-config').default
const manifestPlugin = require('webpack-manifest-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const publicPath = ''

module.exports = new Config().merge({
  output: {
    filename: '[name]-[hash].js',
    publicPath,
    path: path.resolve(__dirname, '../public')
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [path.resolve(__dirname, '../src'), 'node_modules'],
    alias: {
      assets: path.resolve(__dirname, '../assets'),
      images: path.resolve(__dirname, '../assets/images')
    }
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader'
      },
      {
        test: /\.(png|jpg|jpeg)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'assets/images/[name].[hash].[ext]'
          }
        }
      },
      {
        test: /\/sprite\/[\w-]*\.svg$/,
        use: {
          loader: 'svg-sprite-loader',
          options: {
            name: 'assets/images/[name]',
            prefixize: true
          }
        }
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        exclude: [/sprite/],
        use: {
          loader: 'file-loader',
          options: {
            name: 'assets/images/[name].[hash].[ext]',
            mimetype: 'image/svg+xml'
          }
        }
      },
      {
        test: /\.woff(2)?(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'assets/fonts/[name].[hash].[ext]',
            mimetype: 'application/font-woff'
          }
        }
      }
    ]
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new manifestPlugin({
      publicPath,
      writeToFileEmit: true
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../index.html'),
      inject: "body"
    })
  ]
})

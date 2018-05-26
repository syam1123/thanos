const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const package = require('./package.json');
const OfflinePlugin = require('offline-plugin');

const __DEV__ = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: {
    app: [
      'babel-polyfill',
      'react-hot-loader/patch',
      './src/index.js',
    ],
    vendor: Object.keys(package.dependencies)
  },

  output: {
    publicPath: '/',
    chunkFilename: '[name].[hash].js',
    filename: '[name].[hash].js'
  },

  devtool: 'inline-source-map',

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query:{
          presets: ['es2015','react','stage-0']
        }
      },
      {
        test: /\.(eot|svg|ttf|otf|woff|woff2)$/,
        loader: 'file-loader',
      }, {
        test: /\.(jpg|png|gif|jpeg)$/,
        loaders: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
          },
        ],
      }
    ],
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // enable HMR globally

    new webpack.NamedModulesPlugin(),
    // prints more readable module names in the browser console on HMR updates
    //
    new HtmlWebpackPlugin({
      template: 'index.html',
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true,
        },
        inject: true,
    }),

    new webpack.HashedModuleIdsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.[hash].js'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest'
    }),

    new webpack.NoEmitOnErrorsPlugin(),
    // do not emit compiled assets that include errors

    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),

    new OfflinePlugin({
      publicPath: '/',
      caches: {
        main: [
          'vendor.*.js',
          '*.js',
          '**.*.js',
          '*.png',
          '*.otf'
        ]
      },
      responseStrategy: 'cache-first',
      ServiceWorker: {
        navigateFallbackURL: '/',
        cacheName: 'thanos-main' // do not change this. It will leave the old cache in browser for ever
      },
      AppCache: {
        FALLBACK: {
          '/': '/'
        }
      }
    })
  ],

  resolve: {
    modules: ['src', 'node_modules'],
    extensions: [
      '.js',
      '.jsx',
      '.react.js',
    ],
    mainFields: [
      'browser',
      'jsnext:main',
      'main',
    ],
  },

  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },
  devServer: {
    // host: '0.0.0.0',
    host: 'localhost',
    port: 8888,

    compress: true,

    disableHostCheck: true,

    historyApiFallback: true,
    // respond to 404s with index.html

    hot: true,
    // enable HMR on the server
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  },
};

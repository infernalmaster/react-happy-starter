/* eslint-disable no-var */
const webpack = require('webpack');
const path = require('path');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');


const DEBUG = process.env.NODE_ENV !== 'production';
const AUTOPREFIXER_BROWSERS = [
  'Android 2.3',
  'Android >= 4',
  'Chrome >= 35',
  'Firefox >= 31',
  'Explorer >= 9',
  'iOS >= 7',
  'Opera >= 12',
  'Safari >= 7.1'
];

module.exports = {
  entry: {
    app: './src/index',
    vendor: [
      // necessary for hot reloading with IE:
      'eventsource-polyfill',
      // listen to code updates emitted by hot middleware:
      'webpack-hot-middleware/client',
      'react',
      'react-dom'
    ]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist/'
  },
  resolve: {
    root: path.join(__dirname, 'src'),
    modulesDirectories: ['node_modules'],
    extensions: ['', '.js']
  },
  devtool: DEBUG ? 'eval' : 'source-map',
  // devtool: 'cheap-module-eval-source-map',
  // devtool: 'cheap-source-map',
  // this sourcemap is good but need wait to upd issue https://github.com/webpack/webpack/issues/91
  // devtool: 'eval-source-map',
  plugins: [
    // Webpack 1.0
    new webpack.optimize.OccurenceOrderPlugin(),
    // Webpack 2.0 fixed this mispelling
    // new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(DEBUG ? 'development' : 'production') }
    }),
    ...(DEBUG
      ? [
          new BrowserSyncPlugin(
            // BrowserSync options
            {
              // browse to http://localhost:3000/ during development
              host: 'localhost',
              port: 3000,
              // proxy the Webpack Dev Server endpoint
              // (which should be serving on http://localhost:3100/)
              // through BrowserSync
              proxy: 'http://localhost:5000/'
            },
            // plugin options
            {
              // prevent BrowserSync from reloading the page
              // and let Webpack Dev Server take care of this
              reload: false
            }
          ),
          new webpack.HotModuleReplacementPlugin(),
          new webpack.NoErrorsPlugin()
        ]
      : [
          new webpack.optimize.UglifyJsPlugin({
            mangle: true,
            compress: {
              warnings: false,
              sequences: true,
              dead_code: true,
              conditionals: true,
              booleans: true,
              unused: true,
              if_return: true,
              join_vars: true,
              drop_console: true
            }
          })
        ])

  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        // exclude: path.join(__dirname, 'node_modules')
        include: path.join(__dirname, 'src')
      },
      {
          test: /\.(jpe?g|png|gif|svg)$/i,
          loaders: [
            'url-loader?limit=1000&hash=sha512&digest=hex&name=' + (DEBUG ? '[path][name].[ext]?[hash]' : '[hash].[ext]'),
            'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
          ]
      },
      {
        test: /\.(eot|ttf|woff|woff2|wav|mp3)$/,
        loader: 'file-loader',
        query: {
          name: DEBUG ? '[path][name].[ext]?[hash]' : '[hash].[ext]'
        }
      },
      {
        test:   /\.css$/,
        loaders: [
          "style-loader",

          // ?sourceMap=true // FIX sourceMap prevent background-images from loading in Chrome
          // this should fix https://github.com/webpack/style-loader/pull/96
          "css-loader",

          "postcss-loader"
        ],
        include: path.join(__dirname, 'src')
      }
    ]
  },
  postcss: function(webpack) {
    return [
      require('postcss-import')({addDependencyTo: webpack}),
      require('precss'),
      require('colorguard'),
      require('doiuse')({
        browsers: AUTOPREFIXER_BROWSERS,
        // ignore: ['rem'], // an optional array of features to ignore
        // ignoreFiles: ['**/normalize.css'], // an optional array of file globs to match against original source file path, to ignore
        onFeatureUsage: function(usageInfo) {
          console.log(usageInfo.message);
        }
      }),
      require('autoprefixer')({
        browsers: AUTOPREFIXER_BROWSERS
      }),
      ...(DEBUG ? [] : [require('cssnano')])
    ];
  }
};

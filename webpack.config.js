/**
 * WEBPACK CONFIG
 *
 * Notes on config properties:
 *
 * 'entry'
 * Entry point for the bundle.
 *
 * 'output'
 * If you pass an array - the modules are loaded on startup. The last one is exported.
 *
 * 'resolve'
 * Array of file extensions used to resolve modules.
 *
 * 'webpack-dev-server'
 * Is a little node.js Express server, which uses the webpack-dev-middleware to serve a webpack bundle.
 * It also has a little runtime which is connected to the server via Socket.IO.
 *
 * 'webpack/hot/dev-server'
 * By adding a script to your index.html file and a special entry point in your configuration
 * you will be able to get live reloads when doing changes to your files.
 *
 * devtool: 'eval-source-map'
 * http://www.cnblogs.com/Answer1215/p/4312265.html
 * The source map file will only be downloaded if you have source maps enabled and your dev tools open.
 *
 * HotModuleReplacementPlugin()
 * Hot Module Replacement (HMR) exchanges, adds or removes modules while an application is running without page reload.
 *
 * NoErrorsPlugin()
 * Hot loader is better when used with NoErrorsPlugin and hot/only-dev-server since it eliminates page reloads
 * altogether and recovers after syntax errors.
 *
 * 'react-hot'
 * React Hot Loader is a plugin for Webpack that allows instantaneous live refresh without losing state
 * while editing React components.
 *
 * 'babel'
 * Babel enables the use of ES6 today by transpiling your ES6 JavaScript into equivalent ES5 source
 * that is actually delivered to the end user browser.
 */

/* eslint-disable no-var */
var webpack = require('webpack');
var path = require('path');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');


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
          // url-loader
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
          "css-loader?sourceMap=true",
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

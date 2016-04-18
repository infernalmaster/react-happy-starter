var path = require('path');
var webpackCfg = require('./webpack.config.js');

module.exports = function(config) {
  config.set({
    basePath: '',
    autoWatchBatchDelay: 20,
    frameworks: ['tap'],
    files: [
      'webpack.test.bootstrap.js'
    ],

    preprocessors: {
      'webpack.test.bootstrap.js': ['webpack']
    },

    coverageReporter : {
      reporters : [
        { type : 'text-summary' },
        { type : 'html', dir : 'coverage' }
      ]
    },
    reporters: ['dots', 'coverage'],
    browsers: ['Chrome', 'PhantomJS'],
    port: 9876,
    autoWatch: true,
    singleRun: false,

    plugins: [
      'karma-webpack',
      'karma-tap',
      'karma-chrome-launcher',
      'karma-phantomjs-launcher',
      'karma-coverage'
    ],


    webpack: { //kind of a copy of your webpack config
      node : {
        fs: 'empty'
      },
      devtool: 'inline-source-map', //just do inline source maps instead of the default
      module: {
        // Instrument code that isn't test or vendor code.
        // todo ignore test files there
        preLoaders: [{
          test: /\.(js)$/,
          include: /src/,
          exclude: /node_modules/,
          loader: 'isparta'
        }],

        loaders: [...webpackCfg.module.loaders,
          {
            test: /\.json$/,
            loader: 'json'
          },
          {
            test: /sinon\.js$/,
            loader: 'imports?define=>false,require=>false'
          }
        ]
      },
      resolve: Object.assign({}, webpackCfg.resolve, {
        alias: {
            'sinon': 'sinon/pkg/sinon'
        }
      }),
      isparta: {
        embedSource: true,
        noAutoWrap: true
        // these babel options will be passed only to isparta and not to babel-loader
        // babel: {
        //   presets: ['es2015', 'stage-2', 'react']
        // }
      },
      externals: {
        'cheerio': 'window',
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true,
        'react/addons': true
      }
    },

    webpackServer: {
      noInfo: true
    }

  })
};

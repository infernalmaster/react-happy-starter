// /* eslint-disable no-var, strict */
// var webpack = require('webpack');
// var WebpackDevServer = require('webpack-dev-server');
// var config = require('./webpack.config');

// new WebpackDevServer(webpack(config), {
//   publicPath: config.output.publicPath,
//   hot: true,
//   historyApiFallback: true,

//   cache: true,
//   stats: {
//     colors: true,
//     hash: false,
//     timings: true,
//     chunks: false,
//     chunkModules: false,
//     modules: false,
//     assets: true,
//     version: false
//   },
//   /* file system watching config */
//   watchOptions: {
//     aggregateTimeout: 50 // do not re-build for 50ms after the last build, default is 300ms
//   }
// }).listen(5000, 'localhost', function (err) {
//     if (err) {
//       console.log(err);
//     }
//     console.log('Listening at localhost:5000');
//   });


var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.config');

var app = express();
var compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  // noInfo: true,
  publicPath: config.output.publicPath,

  stats: {
    colors: true,
    hash: false,
    timings: true,
    chunks: false,
    chunkModules: false,
    modules: false,
    assets: true,
    version: false
  },
  /* file system watching config */
  watchOptions: {
    aggregateTimeout: 50 // do not re-build for 50ms after the last build, default is 300ms
  }
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use('/public', express.static('public'));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(5000, function(err) {
  if (err) {
    console.log(err);
    return;
  }
});

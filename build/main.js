'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _expressSession = require('express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _webpackDevServer = require('webpack-dev-server');

var _webpackDevServer2 = _interopRequireDefault(_webpackDevServer);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* mongodb connection */
var db = _mongoose2.default.connection;
db.on('error', console.error);
db.once('open', function () {
  console.log('Connected to mongodb server');
});
_mongoose2.default.connect('mongodb://' + process.env.IP + ':27017/qnaboard');

var app = (0, _express2.default)();

/* use session */
app.use((0, _expressSession2.default)({
  secret: 'sdfsfs#E$4234xcvxcv',
  resave: false,
  saveUninitialized: true
}));

/* middleware */
app.use(_bodyParser2.default.json());

/* static files */
app.use('/', _express2.default.static(__dirname + './../public'));

/* use API */

app.use('/api', _routes2.default);

app.get('*', function (req, res) {
  res.sendFile(_path2.default.resolve(__dirname, './../public/index.html'));
});

/* server open */
app.listen(process.env.PORT, process.env.IP, function () {
  console.log('Express is listening on port', process.env.PORT);
});

/* development setting */
if (process.env.NODE_ENV == 'development') {
  var config = require('../webpack.dev.config');
  var compiler = (0, _webpack2.default)(config);
  var devServer = new _webpackDevServer2.default(compiler, config.devServer);
  devServer.listen(config.devServer.port);
  console.log('Server is running on development mode', config.devServer.port);
}
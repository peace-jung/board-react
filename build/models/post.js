'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var Post = new Schema({
  writer: String,
  title: String,
  contents: String,
  date: { type: Date, default: Date.now },
  comments: [{
    writer: String,
    contents: String,
    date: { type: Date, default: Date.now },
    comments: [{
      writer: String,
      contents: String,
      date: { type: Date, default: Date.now }
    }]
  }]
});

exports.default = _mongoose2.default.model('post', Post);
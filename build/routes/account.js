'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _account = require('../models/account');

var _account2 = _interopRequireDefault(_account);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

// /api/account/*

/* 회원가입 */
router.post('/signup', function (req, res) {
  var userInfo = new _account2.default({
    username: req.body.username,
    password: req.body.password
  });

  // 이미 가입되어 있는 아이디인지 검사
  _account2.default.findOne({ username: userInfo.username }, function (err, result) {
    if (err) throw err;

    if (result) {
      return res.status(409).json({
        error: "User Exist",
        code: 1
      });
    }

    // password Hash화
    userInfo.password = userInfo.generateHash(userInfo.password);

    // 유저 등록
    userInfo.save(function (err) {
      if (err) throw err;
      return res.json({ result: true });
    });
  });
});

/* 로그인 */
router.post('/signin', function (req, res) {
  var userInfo = new _account2.default({
    username: req.body.username,
    password: req.body.password
  });

  // 로그인 시도
  _account2.default.findOne({ username: userInfo.username }, function (err, result) {
    if (err) throw err;

    if (!result) {
      return res.status(401).json({
        error: "Login Failed",
        code: 1
      });
    }

    if (!result.validateHash(userInfo.password)) {
      return res.status(401).json({
        error: "Login Failed",
        code: 1
      });
    }

    // 세션 등록
    var session = req.session.loginInfo = {
      _id: result._id,
      username: result.username
    };

    return res.json({ result: true });
  });
});

/* 로그아웃 */
router.post('/signout', function (req, res) {
  req.session.destroy();
  return res.json({ result: true });
});

/* 세션확인 */
router.get('/isLogin', function (req, res) {
  if (typeof req.session.loginInfo === "undefined") {
    return res.status(401).json({
      error: "User is undefined",
      code: 1
    });
  }

  return res.json({ result: req.session.loginInfo });
});

exports.default = router;
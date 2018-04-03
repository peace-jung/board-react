'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _post = require('../models/post');

var _post2 = _interopRequireDefault(_post);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

/* 
-/api/post/comment
*/

/* 댓글 리스트 */
router.get('/', function (req, res) {
  console.log('/api/post/comment/ 접속');
  res.json({ result: true });
});

/* 댓글쓰기 */
router.post('/', function (req, res) {

  // 로그인 여부 확인
  if (typeof req.session.loginInfo === "undefined") {
    return res.status(403).json({
      error: "Not Logged In",
      code: 1
    });
  }

  // title, contents 확인
  if (typeof req.body.id === "undefined" || req.body.comment === "") {
    return res.status(400).json({
      error: "Empty comment",
      code: 2
    });
  }

  var comment = {
    writer: req.session.loginInfo.username,
    contents: req.body.comment
  };

  _post2.default.update({
    _id: req.body.id
  }, {
    $push: {
      comments: comment
    }
  }, function (err, result) {
    if (err) throw err;

    res.send({ result: true });
  });
});

/* 댓글수정 */
router.put('/:postid', function (req, res) {
  // 비로그인 시
  if (typeof req.session.loginInfo === "undefined") {
    return res.status(403).json({
      error: "Forbidden",
      code: 1
    });
  }

  _post2.default.findById(req.params.postid, function (err, post) {
    if (err) throw err;

    // 해당 데이터가 없을 시
    if (!post) {
      return res.status(404).json({
        error: "No Data",
        code: 2
      });
    }

    // 작성자 != 로그인 유저
    if (post.writer !== req.session.loginInfo.username) {
      return res.status(403).json({
        error: "Forbidden",
        code: 1
      });
    }

    memo.title = req.body.title;
    memo.contents = req.body.contents;

    memo.save(function (err, memo) {
      if (err) throw err;
      res.json({ result: true, memo: memo });
    });
  });
});

/* 댓글삭제 */
router.delete('/:postid', function (req, res) {
  // 비로그인 시
  if (typeof req.session.loginInfo === "undefined") {
    return res.status(403).json({
      error: "Forbidden",
      code: 1
    });
  }

  _post2.default.findById(req.params.postid, function (err, post) {
    if (err) throw err;

    // 해당 데이터가 없을 시
    if (!post) {
      return res.status(404).json({
        error: "No Data",
        code: 2
      });
    }

    // 작성자 != 로그인 유저
    if (post.writer !== req.session.loginInfo.username) {
      return res.status(403).json({
        error: "Forbidden",
        code: 1
      });
    }

    _post2.default.remove({ _id: req.params.postid }, function (err) {
      if (err) throw err;
      res.json({ result: true });
    });
  });
});

exports.default = router;
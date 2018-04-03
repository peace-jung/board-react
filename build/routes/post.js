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

var _comment = require('./comment');

var _comment2 = _interopRequireDefault(_comment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ObjectId = _mongoose2.default.Types.ObjectId;

var router = _express2.default.Router();

router.use('/comment', _comment2.default);

/* 
-/api/post/
*/

/* 글 리스트 */
router.get('/', function (req, res) {
  _post2.default.find().sort({ _id: -1 }).limit(5).catch(function (err) {
    throw err;
  }).then(function (posts) {
    res.json({ posts: posts });
  });
});

/* 글쓰기 */
router.post('/', function (req, res) {

  // 로그인 여부 확인
  if (typeof req.session.loginInfo === "undefined") {
    return res.status(403).json({
      error: "Not Logged In",
      code: 1
    });
  }

  // title, contents 확인
  if (typeof req.body.title !== "string" || typeof req.body.contents === "") {
    return res.status(400).json({
      error: "Empty title/contents",
      code: 2
    });
  }

  var post = new _post2.default({
    writer: req.session.loginInfo.username,
    title: req.body.title,
    contents: req.body.contents
  });

  post.save(function (err, id) {
    if (err) throw err;
    console.log(id);
    return res.json({ result: id });
  });
});

/* 글읽기 */
router.get('/:postid', function (req, res) {
  if (req.params.postid == "undefined") {
    return res.status(404).json({
      error: "No Data",
      code: 1
    });
  }

  var id = new ObjectId(req.params.postid);

  _post2.default.findById(id, function (err, post) {
    if (err) throw err;

    if (!post) {
      return res.status(404).json({
        error: "No Data",
        code: 1
      });
    }

    res.json({ post: post });
  });
});

/* 글수정 */
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

/* 글삭제 */
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
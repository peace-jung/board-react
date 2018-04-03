import express from 'express';
import mongoose from 'mongoose';
import Post from '../models/post';

const router = express.Router();

/* 
-/api/post/comment
*/

/* 댓글 리스트 */
router.get('/', (req, res) => {
  console.log('/api/post/comment/ 접속');
  res.json({result: true});
});

/* 댓글쓰기 */
router.post('/', (req, res) => {

  // 로그인 여부 확인
  if(typeof req.session.loginInfo === "undefined") {
    return res.status(403).json({
      error: "Not Logged In",
      code: 1
    });
  }

  // title, contents 확인
  if(typeof req.body.id === "undefined" || req.body.comment === "") {
    return res.status(400).json({
      error: "Empty comment",
      code: 2
    });
  }

  let comment = {
    writer: req.session.loginInfo.username,
    contents: req.body.comment
  };

  Post.update({
    _id: req.body.id
  }, {
    $push: {
      comments: comment
    }
  }, (err, result) => {
    if (err) throw err;

    res.send({result: true});
  });
});

/* 댓글수정 */
router.put('/:postid', (req, res) => {
  // 비로그인 시
  if(typeof req.session.loginInfo === "undefined") {
    return res.status(403).json({
      error: "Forbidden",
      code: 1
    });
  }

  Post.findById(req.params.postid, (err, post) => {
    if(err) throw err;

    // 해당 데이터가 없을 시
    if(!post) {
      return res.status(404).json({
        error: "No Data",
        code: 2
      });
    }

    // 작성자 != 로그인 유저
    if(post.writer !== req.session.loginInfo.username) {
      return res.status(403).json({
        error: "Forbidden",
        code: 1
      });
    }

    memo.title = req.body.title;
    memo.contents = req.body.contents;

    memo.save((err, memo) => {
      if(err) throw err;
      res.json({result: true, memo});
    });
  });
});

/* 댓글삭제 */
router.delete('/:postid', (req, res) => {
  // 비로그인 시
  if(typeof req.session.loginInfo === "undefined") {
    return res.status(403).json({
      error: "Forbidden",
      code: 1
    });
  }

  Post.findById(req.params.postid, (err, post) => {
    if(err) throw err;

    // 해당 데이터가 없을 시
    if(!post) {
      return res.status(404).json({
        error: "No Data",
        code: 2
      });
    }

    // 작성자 != 로그인 유저
    if(post.writer !== req.session.loginInfo.username) {
      return res.status(403).json({
        error: "Forbidden",
        code: 1
      });
    }

    Post.remove({_id: req.params.postid}, (err) => {
      if(err) throw err;
      res.json({result: true});
    });
  });
});

export default router;
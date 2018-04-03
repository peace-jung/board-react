import express from 'express';
import mongoose from 'mongoose';
import Post from '../models/post';
import comment from './comment';
var ObjectId = mongoose.Types.ObjectId;

const router = express.Router();

router.use('/comment', comment);

/* 
-/api/post/
*/

/* 글 리스트 */
router.get('/', (req, res) => {
  Post.find()
  .sort({_id: -1})
  .limit(5)
  .catch((err) => {
    throw err;
  })
  .then((posts) => {
    res.json({posts: posts});
  })
});

/* 글쓰기 */
router.post('/', (req, res) => {

  // 로그인 여부 확인
  if(typeof req.session.loginInfo === "undefined") {
    return res.status(403).json({
      error: "Not Logged In",
      code: 1
    });
  }

  // title, contents 확인
  if(typeof req.body.title !== "string" || typeof req.body.contents === "") {
    return res.status(400).json({
      error: "Empty title/contents",
      code: 2
    });
  }

  let post = new Post ({
    writer: req.session.loginInfo.username,
    title: req.body.title,
    contents: req.body.contents
  });

  post.save((err, id) => {
    if(err) throw err;
    console.log(id);
    return res.json({result: id});
  });
});

/* 글읽기 */
 router.get('/:postid', (req, res) => {
  if(req.params.postid == "undefined") {
    return res.status(404).json({
      error: "No Data",
      code: 1
    });
  }

  let id = new ObjectId(req.params.postid);

  Post.findById(id, (err, post) => {
    if(err) throw err;

    if(!post) {
      return res.status(404).json({
        error: "No Data",
        code: 1
      });
    }

    res.json({post: post});
  });
}); 

/* 글수정 */
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

/* 글삭제 */
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
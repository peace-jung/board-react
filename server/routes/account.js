import express from 'express';
import mongoose from 'mongoose';
import Account from '../models/account';

const router = express.Router();

// /api/account/*

/* 회원가입 */
router.post('/signup', (req, res) => {
  let userInfo = new Account({
    username: req.body.username,
    password: req.body.password
  });

  // 이미 가입되어 있는 아이디인지 검사
  Account.findOne({ username: userInfo.username }, (err, result) => {
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
    userInfo.save(err => {
      if(err) throw err;
      return res.json({result: true});
    });

  });
});

/* 로그인 */
router.post('/signin', (req, res) => {
  let userInfo = new Account({
    username: req.body.username,
    password: req.body.password
  });

  // 로그인 시도
  Account.findOne({username: userInfo.username}, (err, result) => {
    if (err) throw err;
    
    if (!result) {
      return res.status(401).json({
        error: "Login Failed",
        code: 1
      });
    }
    
    if(!result.validateHash(userInfo.password)) {
      return res.status(401).json({
        error: "Login Failed",
        code: 1
      });
    }
      
    // 세션 등록
    let session = req.session.loginInfo = {
      _id: result._id,
      username: result.username
    };
    
    return res.json({result: true});
  });

});

/* 로그아웃 */
router.post('/signout', (req, res) => {
  req.session.destroy();
  return res.json({result: true});
});

/* 세션확인 */
router.get('/isLogin', (req, res) => {
  if(typeof req.session.loginInfo === "undefined") {
    return res.status(401).json({
      error: "User is undefined",
      code: 1
    });
  }
  
  return res.json({result: req.session.loginInfo});
});

export default router;
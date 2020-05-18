var express = require('express');
var router = express.Router();
let UserModel = require('../models/user');
let util = require('../modules/util');
let statusCode = require('../modules/statusCode');
let resMessage = require('../modules/responseMessage');

router.post('/signup', async (req, res) => {
    const {
        id,
        name,
        password,
        email
    } = req.body;

    if (!id || !name || !password || !email) {
        res.status(statusCode.BAD_REQUEST)
            .send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
        return;
    }
/*
    if (UserModel.filter(user => user.id == id).length > 0) {
        res.status(statusCode.BAD_REQUEST)
            .send(util.fail(statusCode.BAD_REQUEST, resMessage.ALREADY_ID));
        return;
    }
    */

    
    UserModel.push({
        id,
        name,
        password,
        email
    });
    res.status(statusCode.OK)
        .send(util.success(statusCode.OK, resMessage.CREATED_USER, {
            userId: id
        }));
});

const salt = 'dfw23EFVR3fefnd68FW3r4343';

    const idx = await User.signup(id,name,password,salt,email);

    if(idex === -1){
        return res.status(statusCode.DB_ERROR)
        .send(util.fail(statusCode.DB_ERROR,resMessage.DB_ERROR));
    }
    res.status(statusCode.OK).send(util.success(statusCode.OK,resMessage.CREATED_USER,{userId:idx}));
/* 
    ✔️ sign in
    METHOD : POST
    URI : localhost:3000/user/signin
    REQUEST BODY : id, password
    RESPONSE STATUS : 200 (OK)
    RESPONSE DATA : User ID
*/
router.post('/signin', async (req, res) => {
 const{
    id,
    password,
 } = req.body;

 if(!id||password){
   res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,resMessage.NULL_VALUE));
   return ;
 }

  const user = User.filter(user=>user.id==id);

  if(user.length==0){
    res.status(statusCode.BAD_REQUEST)
    .send(util.fail(statusCode.BAD_REQUEST,resMessage.NO_USER));
    return ;

  }
  
  if(user[0].password !== password){
    res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,resMessage.MISS_MATCH_PW));
    return ;
  }
  res.status(statusCode.OK).send(util.success(statusCode.OK,resMessage.LOGIN_SUCCESS,{userId:id}))
    // request body 에서 데이터 가져오기
    // request data 확인 - 없다면 Null Value 반환
    // 존재하는 아이디인지 확인 - 없다면 No user 반환
    // 비밀번호 확인 - 없다면 Miss match password 반환
    // 성공 - login success와 함께 user Id 반환
});

/* 
    ✔️ get profile
    METHOD : GET
    URI : localhost:3000/user/profile/:id
    RESPONSE STATUS : 200 (OK)
    RESPONSE DATA : User Id, name, email
*/
router.get('/profile/:id', async (req, res) => {
    // request params 에서 데이터 가져오기
    // 존재하는 아이디인지 확인 - 없다면 No user 반환
    // 성공 - login success와 함께 user Id 반환
});
module.exports = router;
var express = require('express');
var router = express.Router();
let util = require('../modules/util');
let statusCode = require('../modules/statusCode');
let resMessage = require('../modules/responseMessage');
let User = require('../models/user');
let encryption = require('../modules/encryption');


router.post('/signup',async (req,res)=>{
  const{
    id,
    name,
    password,
    email
  } = req.body;

  if(!id || !name || !password || !email){
    res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,resMessage.NULL_VALUE));
  }

  if(await User.checkUser(id)){
    res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,resMessage.ALREADY_ID));
    return ;
  }

  const salt = encryption.makeSalt();

  const pwd = await encryption.encrypt(password,salt);

  const idx = await User.signUp(id,name,pwd,salt,email);

  if(idx===-1){
    return res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR,resMessage.DB_ERROR));
  }

  res.status(statusCode.OK).send(util.success(statusCode.OK,resMessage.CREATED_USER,{userIdx:idx}))

})

router.post('/signIn',async(req,res)=>{
  const {id,password} = req.body;
  
  if(!id || !password){
    res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,resMessage.NULL_VALUE));
  }

  const result = await User.signIn(id);
  console.log(result)

  const hashed = await encryption.encrypt(password,result[0].salt);

  if(hashed == result[0].password){
    res.status(statusCode.OK).send(util.success(statusCode.OK,resMessage.LOGIN_SUCCESS,{userIdx:result[0].userIdx}))
  }else{
    res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,resMessage.MISS_MATCH_PW));
  }
})

router.get('/profile/:id', async(req,res)=>{
  const id = req.params.id;

  const user = await User.getUserById(id);
  if(user.length===0){
    res.status(statusCode.BAD_REQUEST)
    .send(util.fail(statusCode.BAD_REQUEST,responseMessage.NO_USER));
    return ;
  }
  res.status(statusCode.OK).send(util.success(statusCode.OK,resMessage.READ_PROFILE_SUCCESS,{user:user[0]}));
})



module.exports = router;

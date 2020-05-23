var express = require('express');
var router = express.Router();
let UserModel = require('../modules/user');
let util = require('../modules/util');
let statusCode = require('../modules/statusCode');
let resMessage = require('../modules/responseMessage');
const crypto = require('crypto');



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
    if (UserModel.filter(user => user.id == id).length > 0) {
        res.status(statusCode.BAD_REQUEST)
            .send(util.fail(statusCode.BAD_REQUEST, resMessage.ALREADY_ID));
        return;
    }

    const salt = crypto.randomBytes(32).toString('hex');
    const hashed = crypto.pbkdf2Sync(password,salt.toString(),5,32,'sha512').toString('hex');


    UserModel.push({
        id,
        name,
        password,
        email,
        hashed
    });
    res.status(statusCode.OK)
        .send(util.success(statusCode.OK, resMessage.CREATED_USER, {
            userId: id,
            userPw: hashed
        }));
});


router.post('/signin', async (req, res) => {
    const {
        id,
        password,
    } = req.body;


    if(!id || !password){
       res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,resMessage.NULL_VALUE));
       return ;
    }

    const user = UserModel.filter((u)=>{u.id==id});

    if(user.length==0){
        res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,resMessage.NULL_VALUE));
        return ;
    }
    

    const salt = crypto.randomBytes(32).toString('hex');
    const hashed = crypto.pbkdf2Sync(password,salt.toString(),5,32,'sha512').toString('hex');

    if(user[0].hashed!=hashed){
        res.status(statusCode.BAD_REQUEST).send(uti.fail(statusCode.BAD_REQUEST,resMessage.MISS_MATCH_PW))
        return ;
    }

    res.status(statusCode.OK).send(statusCode.OK,resMessage.LOGIN_SUCCESS,{userId:id,userPw:user[0].password,hashed:hashed})
  
});


router.get('/', async (req, res) => {
    res.status(statusCode.ok).send(util.success(statusCode.OK,resMessage.READ_PROFILE_SUCCESS,UserModel))
});



router.get('/profile/:id', async (req, res) => {

    const id = req.params.id;

    if(UserModel.filter(u=>u.id==id).length==0){
        res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,resMessage.NO_USER))
    }

    const user = UserModel.filter(u=>u.id==id)[0];

    const userInfo = {
        user:user.id,
        password:user.password,
        email:user.email
    }
    res.status(statusCode.OK).send(util.success(statusCode.OK,resMessage.READ_PROFILE_SUCCESS,userInfo))
   
});
module.exports = router;
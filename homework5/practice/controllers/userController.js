let responseMessage = require('../modules/responseMessage');
let statusCode = require('../modules/statusCode');
let util = require('../modules/util');
let User = require('../models/user');
const crypto = require('crypto');
const jwt = require('../modules/jwt');

exports.signup = async(req,res)=>{
    const{
        id,name,password,email
    } = req.body;

    if(!id || !password || !name || !email){
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,responseMessage.NULL_VALUE))
    }

    const salt = crypto.randomBytes(32).toString();
    const hashedPw = crypto.pbkdf2Sync(password,salt,1,32,'sha512').toString('hex');
    const result = await User.signUp(id,name,hashedPw,salt,email);

    // result check

    return res.status(statusCode.OK).send(util.success(statusCode.OK,responseMessage.CREATED_USER,{insertIdx:result}))
}

exports.signin = async(req,res)=>{
    const{
        id,password
    } = req.body;

    if(!id || !password){
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,responseMessage.NULL_VALUE))
    }

    if(User.checkUser===false){
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,responseMessage.NO_USER))
    }

    const result = await User.signIn(id,password);

    if(result.length===false){
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,responseMessage.NULL_VALUE))
    }

    const user = await User.getUserById(id)

    const tokenInfo = await jwt.sign(user[0]);

    return res.status(statusCode.OK).send(util.success(statusCode.OK,responseMessage.LOGIN_SUCCESS,{insertIdx:tokenInfo.token}))

}

exports.getUserById = async(req,res)=>{
    const idx = req.userIdx;

    console.log(idx)

    if(idx===null){
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,responseMessage.NULL_VALUE))
    }
    const result = await User.getUserByIdx(idx);

    if(result.length===0){
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,responseMessage.NULL_VALUE))
    }

    return res.status(statusCode.OK).send(util.success(statusCode.OK,responseMessage.OK,{result:result}))
}
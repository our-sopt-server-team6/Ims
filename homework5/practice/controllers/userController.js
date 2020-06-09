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

    //null check

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

    // null check

    // User.checkId

    const result = await User.getUserById(id);

    // result value check

    const tokenInfo = await jwt.sign(result[0]);

    return res.status(statusCode.OK).send(util.success(statusCode.OK,responseMessage.CREATED_USER,{insertIdx:tokenInfo.token}))

}
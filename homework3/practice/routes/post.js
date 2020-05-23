var express = require('express');
var router = express.Router();

let util = require('../modules/util');
let statusCode = require('../modules/statusCode');
let resMessage = require('../modules/responseMessage');
let Post = require('../models/post');

var moment = require('moment');

router.get('/',(req,res)=>{
    var dto = await Post.readAll();
    res.status(statusCode.OK).send(util.success(statusCode.OK,resMessage.READ_PROFILE_SUCCESS,dto))
})

router.post('/', async (res,req)=>{
    const{
        title,
        content,
        author
    }
})
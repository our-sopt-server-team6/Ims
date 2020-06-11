let responseMessage = require('../modules/responseMessage');
let statusCode = require('../modules/statusCode');
let util = require('../modules/util');
let Post = require('../models/post');
const crypto = require('crypto');
const jwt = require('../modules/jwt');

exports.createPost= async(req,res)=>{
    const user_idx = req.userIdx;

    const {
        title,
        content
    } = req.body;

    if(!title || !content){
        res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,responseMessage.NULL_VALUE))
    }

    const insertIdx = await Post.createPost(user_idx,title,content);

    if(insertIdx===null){
        res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,responseMessage.NULL_VALUE))
    }

    res.status(statusCode.OK).send(util.success(statusCode.OK,responseMessage.POST_SUCCESS,{insertPostIdx:insertIdx,userToken:req.headers.token}))

}

exports.getAllPost= async(req,res)=>{
    const result = await Post.getAllPost();

    if(result===null){
        res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,responseMessage.NULL_VALUE))
    }

    res.status(statusCode.OK).send(util.success(statusCode.OK,responseMessage.READ_PROFILE_SUCCESS,{post:result}))
}

exports.getPostById= async(req,res)=>{
    const idx = req.params.idx;

    if(idx===null){
        res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,responseMessage.NULL_VALUE))
    }

    const result = await Post.getPostById(idx)

    if(result===null){
        res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,responseMessage.NULL_VALUE))
    }

    res.status(statusCode.OK).send(util.success(statusCode.OK,responseMessage.READ_PROFILE_SUCCESS,{post:result}))

}

exports.updatePost= async(req,res)=>{
    const user_idx = req.userIdx;
    const idx= req.params.idx;
    const {
        title,
        content
    } = req.body;

    if(!title || !content){
        res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,responseMessage.NULL_VALUE))
    }

    const result = await Post.update(user_idx,idx,title,content)

    const updateResult = await Post.getPostById(idx)

    if(result===null){
        res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,responseMessage.NULL_VALUE))
    }

    res.status(statusCode.OK).send(util.success(statusCode.OK,responseMessage.updateData,{result:result.protocol41,updateData:updateResult}))

}

exports.deletePost= async(req,res)=>{
    const idx = req.params.idx;

    const result = await Post.delete(idx);

    if(result===null){
        res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,responseMessage.NULL_VALUE))
    }

    res.status(statusCode.OK).send(util.success(statusCode.OK,responseMessage.DELETE_USER,{deleteData:result.protocol41}))

}
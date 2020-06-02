const express = require('express');
const Post = require('../models/post');
const router = express.Router();

let util = require('../modules/util');
let statusCode = require('../modules/statusCode');
let responseMessage = require('../modules/responseMessage');

const moment = require('moment');
const date = new Date();
let createdAt = moment(date).format('YYYY-MM-DD HH:mm:ss');

router.post('/add',async(req,res)=>{
    const {author,title,content} = req.body;

    if(!author || !title || !content){
        res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,responseMessage.NULL_VALUE))
    }

    const postIdx = await Post.addPost(author,title,content,createdAt);
    
    if(postIdx===-1){
        res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,responseMessage.BAD_REQUEST))
    }
    res.status(statusCode.OK).send(util.success(statusCode.OK,responseMessage.OK,{postIdx:postIdx}));
})

router.get('/:id',async(req,res)=>{
    const findIdx = req.params.id;

    if(!findIdx){
        res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,responseMessage.NULL_VALUE))
    }

    const postData = await Post.getPostById(findIdx);

    if(postData.length === 0){
        res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,responseMessage.NULL_VALUE))
    }
    
    res.status(statusCode.OK).send(util.success(statusCode.OK,responseMessage.OK,postData[0]));
})

router.put('/update/:id',async(req,res)=>{
    const id = req.params.id;

    const{title,content}=req.body;

    if (!title || !content || !id) {
        return res.status(statusCode.BAD_REQUEST)
            .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
    }

    const result = await Post.update(id,title,content);
    const data = await Post.getPostById(id);

    if(result.length == 0){
        res.status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, responseMessage.POST_EDIT_FAIL));
    }

    res.status(statusCode.OK).send(util.success(statusCode.OK,responseMessage.OK,{data:data}));
})

router.delete('/delete/:id',async(req,res)=>{
    const id = req.params.id;

    if (!id) {
        return res.status(statusCode.BAD_REQUEST)
            .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
    }

    const result = await Post.delete(id);

    if(result == 0) {
        res.status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, responseMessage.POST_DELETE_FAIL));
    }

    res.status(statusCode.OK).send(util.success(statusCode.OK,responseMessage.OK,{result:result}));
})
module.exports=router;
var express = require('express');
var router = express.Router();
let Post = require('../models/post');
let util = require('../modules/util');
let statusCode = require('../modules/statusCode');
let resMessage = require('../modules/responseMessage');

router.get('/', async (req, res) => {
    const data = await Post.readAll();

    res.status(statusCode.OK)
        .send(util.success(statusCode.OK, resMessage.READ_POST_SUCCESS, data));
});

router.get('/:idx', async (req, res) => {
    const idx = req.params.idx;
    
    if (!idx) {
        res.status(statusCode.BAD_REQUEST)
            .send(util.fail(statusCode.BAD_REQUEST, resMessage.NO_USER));
        return;
    }

    const data = await Post.read(idx);

    res.status(statusCode.OK)
        .send(util.success(statusCode.OK, resMessage.READ_POST_SUCCESS, data));
});

router.post('/', async (req, res) => {
    const {
        author,
        title, 
        description
    } = req.body;

    if (!author || !title || !description) {
        res.status(statusCode.BAD_REQUEST)
            .send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
        return;
    }

    const data = await Post.create(author, title, description);
    
    if(!data){
        return res.status(statusCode.DB_ERROR)
        .send(util.fail(statusCode.DB_ERROR, resMessage.CREATE_FAIL));
    }
    res.status(statusCode.OK)
        .send(util.success(statusCode.OK, resMessage.CREATE_POST_SUCCESS, data));
});

router.put('/:idx', async (req, res) => {
    const idx = req.params.idx;

    const {
        author,
        title, 
        description
    } = req.body;
    

    if(!idx){
        res.status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, resMessage.NO_USER));
    return;
    }
    const updatePost = {author: author, title: title, description:description};

    const newPost = await Post.update(idx, updatePost);

    if (!newPost) {
        return res.status(statusCode.DB_ERROR)
        .send(util.fail(statusCode.DB_ERROR, resMessage.UPDATE_FAIL));
    }
    
    res.status(statusCode.OK)
    .send(util.success(statusCode.OK, resMessage.UPDATE_POST_SUCCESS, newPost));

});

router.delete('/:idx', async (req, res) => {
    const idx = req.params.idx;

    if (!idx) {
        res.status(statusCode.BAD_REQUEST)
            .send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
        return;
    }
    
    if(!await Post.delete(idx)){
        return res.status(statusCode.DB_ERROR)
        .send(util.fail(statusCode.DB_ERROR, resMessage.DELETE_FAIL));
    }
    else{
        res.status(statusCode.OK)
        .send(util.success(statusCode.NO_CONTENT, resMessage.DELETE_SUCCESS));
    }
})
module.exports = router;
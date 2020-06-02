var express = require('express')
var router = express.Router();

let Category = require('../models/category_1');
let util = require('../modules/util');
let statusCode = require('../modules/statusCode');
let responseMessage = require('../modules/responseMessage');

router.get('/',async(req,res)=>{
    const result = await Category.getAll();

    res.status(statusCode.OK).send(util.success(statusCode.OK,responseMessage.OK,{result:result}))
})

module.exports=router;
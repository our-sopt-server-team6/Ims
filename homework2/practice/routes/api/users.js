var express = require('express')
var router = express.Router();

router.get('/login',(req,res)=>{
    const post = {
        name: "유저",
        age: "1533",
        gender:"man"
    }
    const result={
        status:200,
        message:"login 성공",
        data:post
    }
    res.status(200).send(result)
})

router.get('/signup',(req,res)=>{
    const post = {
        name: "유저",
        age: "1533",
        gender:"man"
    }
    const result={
        status:200,
        message:"signup 성공",
        data:post
    }
    res.status(200).send(result)
})

module.exports = router;
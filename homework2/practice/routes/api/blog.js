var express = require('express')
var router = express.Router();

router.get('/post',(req,res)=>{
    const post = {
        name: "임얼쑤",
        age: "15",
        gender:"man"
    }
    const result={
        status:200,
        message:"성공",
        data:post
    }
    res.status(200).send(result)
})

module.exports = router;
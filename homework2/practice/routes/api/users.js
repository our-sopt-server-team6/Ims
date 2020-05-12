var express = require('express')
var router = express.Router();

router.get('/',(req,res)=>{
    const post = {
        name: "유저",
        age: "1533",
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
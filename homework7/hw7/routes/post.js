var express = require('express');
const postController = require('../controllers/postController')
var router = express.Router();

const authUtil = require('../middlewares/auth').checkToken;


router.get('/',postController.getAllPost)
router.get('/:idx',postController.getPostById)

router.post('/',authUtil,postController.createPost)

//post idx 를 통한 글 수정 
router.put('/:idx',authUtil,postController.updatePost)

//post idx 를 통한 글 삭제 
router.delete('/:idx',authUtil,postController.deletePost)

module.exports=router;
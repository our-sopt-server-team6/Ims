const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user');
const AuthMiddleware = require('../middlewares/auth');
const ImageController = require('../controllers/image')
const multer = require('multer');
// const upload = multer({
//     dest:'upload/'
// })

const upload = require('../modules/multer')
router.post('/signup', UserController.signup);
router.post('/signin', UserController.signin);

/* 
    ✔️ update profile
    METHOD : POST
    URI : localhost:3000/user/profile
    REQUEST HEADER : JWT
    REQUEST BODY : ⭐️image file ⭐️
    RESPONSE DATA : user profile
*/
router.post('/profile', AuthMiddleware.checkToken, upload.array('images',4), ImageController.array);
// single : 키값이 profile인 값을 받아온다

module.exports = router;
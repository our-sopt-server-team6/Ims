var express = require('express');
const userController = require('../controllers/userController')
var router = express.Router();

const authUtil = require('../middlewares/auth').checkToken

/* GET users listing. */
router.post('/signup', userController.signup);
router.post('/signin',userController.signin);

router.get('/',authUtil,userController.getUserById);

module.exports = router;

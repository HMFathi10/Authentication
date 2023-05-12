const { Router } = require('express');
const router = Router();
const authController = require('../controller/authController');


router.get('/login', authController.authLoginGet);
router.post('/login', authController.authLoginPost);

router.get('/signup', authController.authSignUpGet);
router.post('/signup', authController.authSignUpPost);

router.get('/logout', authController.authLogOut);


module.exports = router;
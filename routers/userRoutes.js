const express = require('express');
const authController = require('./../controllers/authController');
const userController = require('./../controllers/userController');

const router = express.Router();


router.post('/signup',authController.signup);
router.post('/login',authController.login);

router.use(authController.protect);
router.get('/',userController.getUser);
router.patch('/follow',userController.addFollower);
router.patch('/unfollow',userController.unfollow);
router.get('/follower',userController.getFollower);
router.get('/following',userController.getFollowing);


module.exports = router;
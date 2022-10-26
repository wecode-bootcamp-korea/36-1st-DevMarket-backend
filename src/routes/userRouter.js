const express = require('express');
const userController = require('../controllers/userController');
const validation = require('../middlewares/auth');

const router = express.Router();

router.post('/signup', userController.signUp);
router.post('/signin', userController.signIn);
router.get('/profile', validation.validateToken, userController.getUserInfo);

module.exports = { router };



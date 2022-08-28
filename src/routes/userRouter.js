const express = require('express');
const errorHandler = require('../middlewares/errorHandler');
const userController = require('../controllers/userController');
const validation = require('../middlewares/auth');

const router = express.Router();

router.post('/signup', errorHandler(userController.signUp));
router.post('/signin', errorHandler(userController.signIn));
router.get('/profile', validation.validateToken, errorHandler(userController.getUserInfo));

module.exports = { router };



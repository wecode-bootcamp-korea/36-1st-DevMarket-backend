const express = require('express');
const errorHandler = require('../middlewares/userErrorHandler');
const userController = require('../controllers/userController');
const validation = require('../middlewares/auth');

const router = express.Router();

router.post('/signup', errorHandler(userController.signUp));
router.post('/signin', errorHandler(userController.signIn));
router.get('/info', validation.validateToken, errorHandler(userController.loadUserInfo));

module.exports = {
    router
};
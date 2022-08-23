const express = require('express');
const errorHandler = require('../middlewares/userErrorHandler');
const productController = require('../controllers/productController');
const router = express.Router();

router.post('/reviews/:productId', errorHandler(productController.createReview));

module.exports = {
    router
}
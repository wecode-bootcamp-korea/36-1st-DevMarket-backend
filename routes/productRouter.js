const express = require('express');
const errorHandler = require('../middlewares/userErrorHandler');
const productController = require('../controllers/productController');
const validation = require('../middlewares/auth');
const router = express.Router();

router.get('/:productId/reviews', errorHandler(productController.loadReviews));
router.post('/:productId/reviews', validation.validateToken, errorHandler(productController.createReview));

module.exports = {
    router
}
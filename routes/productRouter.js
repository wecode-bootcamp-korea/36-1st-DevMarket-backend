const express = require('express');
const errorHandler = require('../middlewares/userErrorHandler');
const productController = require('../controllers/productController');
const validation = require('../middlewares/auth');
const router = express.Router();

router.get('/:productId/reviews', errorHandler(productController.getReviews));
router.post('/:productId/reviews', validation.validateToken, errorHandler(productController.createReview));
router.delete('/reviews/:reviewId', validation.validateToken, errorHandler(productController.deleteReview));

module.exports = {
    router
}
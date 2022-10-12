const express = require('express');
const reviewController = require('../controllers/reviewController');
const validation = require('../middlewares/auth');
const router = express.Router();

router.get('/:productId', reviewController.getReviews);
router.post('/:productId', validation.validateToken, reviewController.createReview);
router.delete('/:reviewId', validation.validateToken, reviewController.deleteReview);
router.patch('/:reviewId', validation.validateToken, reviewController.updateReview);

module.exports = {
    router
}
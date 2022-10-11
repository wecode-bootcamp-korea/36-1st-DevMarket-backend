const express = require('express');
const reviewController = require('../controllers/reviewController');
const validation = require('../middlewares/auth');
const router = express.Router();

router.get('/:productId/reviews', reviewController.getReviews);
router.post('/:productId/reviews', validation.validateToken, reviewController.createReview);
router.delete('/reviews/:reviewId', validation.validateToken, reviewController.deleteReview);
router.patch('/reviews/:reviewId', validation.validateToken, reviewController.updateReview);

module.exports = {
    router
}
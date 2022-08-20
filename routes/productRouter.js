const express = require('express');
const productController = require('../controllers/productController');
const router = express.Router();

router.post('/review/:productId', productController.createReview);
router.get('/review/:productId', productController.loadReviews);
router.delete('/review', productController.deleteReview);
router.patch('/review', productController.updateReview);

module.exports = {
    router
};
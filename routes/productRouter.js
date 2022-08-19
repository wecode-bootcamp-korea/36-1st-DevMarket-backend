const express = require('express');
const productController = require('../controllers/productController');
const router = express.Router();

router.post('/review', productController.createReview);
router.get('/review', productController.loadReviews);
router.delete('/review', productController.deleteReview);
router.patch('/review', productController.updateReview);

module.exports = {
    router
};
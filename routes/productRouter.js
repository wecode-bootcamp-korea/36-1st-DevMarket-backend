const express = require('express');
const errorHandler = require('../middlewares/userErrorHandler');
const productController = require('../controllers/productController');
const validation = require('../middlewares/auth');
const router = express.Router();

router.get('/:productId/reviews', errorHandler(productController.getReviews));
router.post('/:productId/reviews', validation.validateToken, errorHandler(productController.createReview));
router.delete('/reviews/:reviewId', validation.validateToken, errorHandler(productController.deleteReview));
router.patch('/reviews/:reviewId', validation.validateToken, errorHandler(productController.updateReview));

router.get("/all", errorHandler(productController.loadProductList));
router.get("/ascending", errorHandler(productController.getProductsByAsc));
router.get("/descending", errorHandler(productController.getProductsByDesc));
router.get("/list", errorHandler(productController.getProductsByCategories));
router.post("/cart", validation.validateToken, errorHandler(productController.addProductAmount));
router.get("/detail/:productId", errorHandler(productController.getProductDetail));

module.exports = {
    router
}

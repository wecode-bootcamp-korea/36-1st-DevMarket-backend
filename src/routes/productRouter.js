const express = require('express');
const productController = require('../controllers/productController');
const validation = require('../middlewares/auth');
const router = express.Router();

router.get('/:productId/reviews', productController.getReviews);
router.post('/:productId/reviews', validation.validateToken, productController.createReview);
router.delete('/reviews/:reviewId', validation.validateToken, productController.deleteReview);
router.patch('/reviews/:reviewId', validation.validateToken, productController.updateReview);

router.get("/all", productController.loadProductList);
router.get("/ascending", productController.getProductsByAsc);
router.get("/descending", productController.getProductsByDesc);
router.get("/list", productController.getProductsByCategories);
router.post("/cart", validation.validateToken, productController.addProductAmount);
router.get("/detail/:productId", productController.getProductDetail);

module.exports = {
    router
}

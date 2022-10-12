const express = require('express');
const productController = require('../controllers/productController');
const validation = require('../middlewares/auth');
const router = express.Router();

router.get("/ascending", productController.getProductsByAsc);
router.get("/descending", productController.getProductsByDesc);
router.get("/categoooo", productController.getProductsByCategories);
router.post("/cart", validation.validateToken, productController.addProductAmount);

router.get("/list", productController.loadProductList);
router.get("/details/:productId", productController.getProductDetail);

module.exports = {
    router
}

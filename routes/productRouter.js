const express = require("express");
const productController = require("../controllers/productController");
const router = express.Router();

router.get("/all", productController.loadProductList);
router.get("/:productName", productController.productDetail);

module.exports = {
    router
}
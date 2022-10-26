const express = require("express");
const cartController = require("../controllers/cartController");
const validation = require('../middlewares/auth');
const router = express.Router();

router.get("/list", validation.validateToken, cartController.getCartList);
router.post("/:productId", validation.validateToken, cartController.addProduct);
router.delete("/:cartId", validation.validateToken, cartController.deleteCart);
router.patch("/:cartId", validation.validateToken, cartController.updateAmount);

module.exports = {
    router
}
const express = require("express");
const errorHandler = require('../middlewares/errorHandler');
const cartController = require("../controllers/cartController");
const router = express.Router();

router.get("/list", errorHandler(cartController.getCartLists));
router.post("/product/:productId", errorHandler(cartController.addProduct));
router.delete("/:productId", errorHandler(cartController.deleteCart));
router.patch("/:productId/amount", cartController.updateAmount);

module.exports = {
    router
}
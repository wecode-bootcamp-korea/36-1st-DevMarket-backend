const express = require("express");
const cartController = require("../controllers/cartController");
const errorHandler = require('../middlewares/userErrorHandler');
const router = express.Router();

router.get("/list", errorHandler(cartController.getCartLists));
router.post("/product", errorHandler(cartController.addProduct));
router.delete("", errorHandler(cartController.deleteCart));
router.patch("/amount", cartController.updateAmount);

module.exports = {
    router
}
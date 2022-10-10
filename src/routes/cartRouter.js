const express = require("express");
const cartController = require("../controllers/cartController");
const router = express.Router();

router.get("/list", cartController.getCartLists);
router.post("/:productId", cartController.addProduct);
router.delete("/:productId", cartController.deleteCart);
router.patch("/:productId", cartController.updateAmount);

module.exports = {
    router
}
const express = require("express");
const cartController = require("../controllers/cartController");
const router = express.Router();

router.get("/list",cartController.cartList);
router.post("/product", cartController.addProduct);
router.delete("/products", cartController.deleteCart);
router.patch("/amount", cartController.updateAmount);

module.exports = {
    router
}
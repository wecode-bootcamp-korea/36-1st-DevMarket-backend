const express = require("express");
const cartController = require("../controllers/cartController");
const router = express.Router();

router.get("/list", cartController.getCartLists);
router.post("/product", cartController.addProduct);

module.exports = {
    router
}
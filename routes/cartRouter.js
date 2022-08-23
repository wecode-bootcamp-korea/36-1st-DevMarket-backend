const express = require("express");
const cartController = require("../controllers/cartController");
const router = express.Router();

router.get("/list",cartController.cartList);

module.exports = {
    router
}
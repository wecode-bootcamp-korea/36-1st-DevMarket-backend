const express = require("express");
const cartController = require("../controllers/cartController");
const validation = require("../middlewares/auth");
const router = express.Router();

router.get("/list", validation.validateToken,cartController.getCartLists);

module.exports = {
    router
}
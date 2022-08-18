const express = require("express");
const router = express.Router();
const productRouter = require("./productRouter");
const cartRouter = require("./cartRouter");

router.use("/product", productRouter.router);
router.use("/cart", cartRouter.router);

module.exports = router;
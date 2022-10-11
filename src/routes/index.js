const express = require("express");
const router = express.Router();
const validation = require("../middlewares/auth");
const userRouter = require('./userRouter');
const productRouter = require('./productRouter');
const cartRouter = require("./cartRouter");
const reviewRouter = require("./reviewRouter")

router.use("/users", userRouter.router);
router.use("/products", productRouter.router);
router.use("/reviews", reviewRouter.router);
router.use("/cart", validation.validateToken, cartRouter.router);

module.exports = router;
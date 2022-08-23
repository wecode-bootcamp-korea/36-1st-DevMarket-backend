const express = require("express");
const router = express.Router();

const userRouter = require('./userRouter');
const productRouter = require('./productRouter');
const validation = require('../middlewares/auth');

router.use("/users", userRouter.router);
router.use("/products", validation.validateToken, productRouter.router);

module.exports = router;
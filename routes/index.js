const express = require("express");
const router = express.Router();
const cartRouter = require("./cartRouter");

router.use("/cart", cartRouter.router);

const userRouter = require('./userRouter');
const validation = require('../middlewares/auth');

router.use("/users", userRouter.router);

module.exports = router;
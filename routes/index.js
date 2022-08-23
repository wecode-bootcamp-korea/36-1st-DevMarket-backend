const express = require("express");
const router = express.Router();
const userRouter = require('./userRouter');
const cartRouter = require("./cartRouter");
const validation = require('../middlewares/auth');

router.use("/cart", cartRouter.router);
router.use("/users", userRouter.router);

module.exports = router;
const express = require("express");
const router = express.Router();

const userRouter = require('./userRouter');
const validation = require('../middlewares/auth');

router.use("/users", userRouter.router);

module.exports = router;
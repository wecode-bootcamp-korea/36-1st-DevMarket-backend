const express = require("express");
const router = express.Router();

const userRouter = require('./userRouter');
const validation = require('../middlewares/auth');


router.use("/user", userRouter.router);

module.exports = router;
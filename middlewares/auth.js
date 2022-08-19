const jwt = require('jsonwebtoken');
const userDao = require("../models/userDao");

const validateToken = async (req, res, next) => {
    try {
        const token = await req.header('authorization');
        const decoded = await jwt.verify(token, process.env.TOKEN_SECRET);
        const userId = decoded.userId;
        const userIdCode = decoded.sub;
        const foundUser = await userDao.getUserByUserId(userId);

        if (!foundUser)
            errorGenerator({ statusCode: 404, message: 'USER_NOT_FOUND' });
        req.body.userId = userId;
        req.body.userIdCode = userIdCode;
        console.log(userIdCode);
        console.log(req.body.userIdCode);
        next();
    } catch (err) {
        next(err);
    }
};

module.exports = {
    validateToken
}
const jwt = require('jsonwebtoken');
const userDao = require("../models/userDao");

const validateToken = async (req, res, next) => {
    try {
        const token = req.header('authorization');
        const decoded = await jwt.verify(token, process.env.TOKEN_SECRET);
        const userName = decoded.userName;
        const userId = decoded.sub;
        const foundUser = await userDao.getUserByUserName(userName);

        if (!foundUser)
            errorGenerator({ statusCode: 400, message: 'USER_NOT_FOUND' });
        req.body.userName = userName;
        req.body.userId = userId;
        next();
    } catch (err) {
        next(err);
    }
};

module.exports = {
    validateToken
}
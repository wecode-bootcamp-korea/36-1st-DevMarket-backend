const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userDao = require('../models/userDao');
const validation = require('../utils/validators');
const appError = require('../middlewares/appError');

const signUp = async (userName, password, name, email, phoneNumber, birth) => {

    const user = await userDao.getUserByUserName(userName);

    if (user) throw new appError('USER_ALREADY_EXIST', 409);

    validation.userValidation(userName, password, name, email, phoneNumber, birth);

    const hashedPassword = await bcrypt.hash(password, 12);

    await userDao.signUp(userName, hashedPassword, name, email, phoneNumber, birth);
};

const signIn = async (userName, password) => {
    const user = await userDao.getUserByUserName(userName);

    if (!user) throw new appError('USER_NOT_EXIST', 409);

    const result = await bcrypt.compare(password, user.password);

    if (!result) throw new appError('INVALID_PASSWORD', 409);

    return jwt.sign({ sub: user.id, userName: user.user_name }, process.env.TOKEN_SECRET, { expiresIn: '30d' });
}

const loadUserInfo = async (userName) => {
    const user = await userDao.getUserByUserName(userName);

    if (!user) throw new appError('USER_NOT_EXIST', 409);

    return user;
}

module.exports = {
    signUp,
    signIn,
    loadUserInfo
}
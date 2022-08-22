const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userDao = require('../models/userDao');
const validation = require('../utils/validators');


const signUp = async (userName, password, name, email, phoneNumber, birth) => {

    const user = await userDao.getUserByUserName(userName);

    if (user) {
        const err = new Error("USER_ALREADY_EXIST");
        err.statusCode = 409;
        throw err;
    }

    validation.validateUserId(userName);
    validation.validatePassword(password);
    validation.validateName(name);
    validation.validateEmail(email);
    validation.validatePhoneNumber(phoneNumber);
    validation.validateBirth(birth);

    const hashedPassword = await bcrypt.hash(password, 12);

    await userDao.signUp(userName, hashedPassword, name, email, phoneNumber, birth);
};

const signIn = async (userName, password) => {
    const user = await userDao.getUserByUserName(userName);

    if (!user) {
        const err = new Error("USER_NOT_EXIST");
        err.statusCode = 409;
        throw err;
    }

    const result = await bcrypt.compare(password, user.password);

    if (!result) {
        const err = new Error("INVALID_PASSWORD");
        err.statusCode = 409;
        throw err;
    }

    return jwt.sign({ sub: user.id, userName: user.user_name }, process.env.TOKEN_SECRET, { expiresIn: '30d' });
}

const loadUserInfo = async (userName) => {
    const user = await userDao.getUserByUserName(userName);

    if (!user) {
        const err = new Error("USER_NOT_EXIST");
        err.statusCode = 409;
        throw err;
    }

    return user;
}

module.exports = {
    signUp,
    signIn,
    loadUserInfo
}
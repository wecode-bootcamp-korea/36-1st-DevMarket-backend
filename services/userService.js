const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userDao = require('../models/userDao');
const validation = require('../utils/validators');


const signUp = async (userId, password, name, email, phoneNumber, birth) => {

    const user = await userDao.getUserByUserId(userId);

    if (user) {
        const err = new Error("USER_ALREADY_EXIST");
        err.statusCode = 409;
        throw err;
    }

    validation.validateUserId(userId);
    validation.validatePassword(password);
    validation.validateName(name);
    validation.validateEmail(email);
    validation.validatePhoneNumber(phoneNumber);
    validation.validateBirth(birth);

    const hashedPassword = await bcrypt.hash(password, 12);

    await userDao.signUp(userId, hashedPassword, name, email, phoneNumber, birth);
};

const signIn = async (userId, password) => {
    const user = await userDao.getUserByUserId(userId);

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

    return jwt.sign({ sub: user.id, userId: user.user_id }, process.env.TOKEN_SECRET, { expiresIn: '30d' });
}

const loadUserInfo = async (userId) => {
    const user = await userDao.getUserByUserId(userId);

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
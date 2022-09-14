const AppError = require('../middlewares/appError');

const validateEmail = (email) => {
    const re = new RegExp(
        /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/
    );

    if (!re.test(email)) throw new AppError('INVALID_EMAIL', 409);
};

const validateUserId = (userName) => {
    const re = new RegExp(
        /^[^.](?!.*[.]{2})[a-zA-Z0-9.!#$%&’'*+/=?^_`{|}~-]{2,}[^.]+$/
    );

    if (!re.test(userName)) throw new AppError('INVALID_USER_ID', 409);
};

const validatePassword = (password) => {
    const re = new RegExp(
        /^[^.](?!.*[.]{2})[a-zA-Z0-9.!#$%&’'*+/=?^_`{|}~-]{2,}[^.]+$/
    );

    if (!re.test(password)) throw new AppError('INVALID_PASSWORD', 409);
}

const validatePhoneNumber = (phoneNumber) => {
    const re = new RegExp(
        /^[0-9]{3}[-]+[0-9]{4}[-]+[0-9]{4}$/
    );

    if (!re.test(phoneNumber)) throw new AppError('INVALID_PASSWORD', 409);
}

const validateBirth = (birth) => {
    const re = new RegExp(
        /^[0-9]{4}[-]+[0-9]{2}[-]+[0-9]{2}$/
    );

    if (!re.test(birth)) throw new AppError('INVALID_BIRTH', 409);
}

const validateName = (name) => {
    const re = new RegExp(
        /^[가-힣]+$/
    );

    if (!re.test(name)) throw new AppError('INVALID_NAME', 409);
}

const userValidation = (userName, password, name, email, phoneNumber, birth) => {
    validateUserId(userName);
    validatePassword(password);
    validateName(name);
    validateEmail(email);
    validatePhoneNumber(phoneNumber);
    validateBirth(birth);
}

const offSetValidation = (offset) => {
    if (!offset) return 0;
}

const limitValidation = (limit) => {
    if (!limit) return 30;
}

module.exports = {
    validateEmail,
    validateUserId,
    validatePassword,
    validatePhoneNumber,
    validateBirth,
    validateName,
    userValidation,
    offSetValidation,
    limitValidation
};
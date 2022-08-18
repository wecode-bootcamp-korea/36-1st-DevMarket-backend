const validateEmail = (email) => {
    const re = new RegExp(
        /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/
    );

    if (!re.test(email)) {
        const err = new Error("INVALID_EMAIL");
        err.statusCode = 409;
        throw err;
    }
};

const validateUserId = (userId) => {
    const re = new RegExp(
        /^[^.](?!.*[.]{2})[a-zA-Z0-9.!#$%&’'*+/=?^_`{|}~-]{2,}[^.]+$/
    );

    if (!re.test(userId)) {
        const err = new Error("INVALID_USER_ID");
        err.statusCode = 409;
        throw err;
    }
};

const validatePassword = (password) => {
    const re = new RegExp(
        /^[^.](?!.*[.]{2})[a-zA-Z0-9.!#$%&’'*+/=?^_`{|}~-]{2,}[^.]+$/
    );

    if (!re.test(password)) {
        const err = new Error("INVALID_PASSWORD");
        err.statusCode = 409;
        throw err;
    }
}

const validatePhoneNumber = (phoneNumber) => {
    const re = new RegExp(
        /^[0-9]{3}[-]+[0-9]{4}[-]+[0-9]{4}$/
    );

    if (!re.test(phoneNumber)) {
        const err = new Error("INVALID_PHONE_NUMBER");
        err.statusCode = 409;
        throw err;
    }
}

const validateBirth = (birth) => {
    const re = new RegExp(
        /^[0-9]{4}[-]+[0-9]{2}[-]+[0-9]{2}$/
    );

    if (!re.test(birth)) {
        const err = new Error("INVALID_BIRTH");
        err.statusCode = 409;
        throw err;
    }
}

const validateName = (name) => {
    const re = new RegExp(
        /^[가-힣]+$/
    );

    if (!re.test(name)) {
        const err = new Error("INVALID_NAME");
        err.statusCode = 409;
        throw err;
    }
}



module.exports = {
    validateEmail,
    validateUserId,
    validatePassword,
    validatePhoneNumber,
    validateBirth,
    validateName
};
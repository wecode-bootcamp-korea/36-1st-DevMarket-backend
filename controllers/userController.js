const userService = require('../services/userService');

const signUp = async (req, res) => {
    const { userName, password, name, email, phoneNumber, birth } = req.body;

    if (!userName || !password || !name || !email || !phoneNumber || !birth) {
        const err = new Error("KEY_ERROR");
        err.statusCode = 400;
        throw err;
    }
        await userService.signUp(userName, password, name, email, phoneNumber, birth);

    res.status(201).json({ message: 'SIGNUP_SUCCESS' });
}

const signIn = async (req, res) => {
    const { userName, password } = req.body;

    const accessToken = await userService.signIn(userName, password);

    res.status(200).json({ authorization: accessToken });
}

const loadUserInfo = async (req, res) => {
    const { userName } = req.body;

    const user = await userService.loadUserInfo(userName);

    res.status(200).json({ user: user });
}



module.exports = {
    signUp,
    signIn,
    loadUserInfo
}
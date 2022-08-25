const userService = require('../services/userService');
const appError = require('../middlewares/appError');

const signUp = async (req, res) => {
    const { userName, password, name, email, phoneNumber, birth } = req.body;

    if (!userName || !password || !name || !email || !phoneNumber || !birth)
        throw new appError('KEY_ERROR', 400);

        await userService.signUp(userName, password, name, email, phoneNumber, birth);

    res.status(201).json({ message: 'SIGNUP_SUCCESS' });
}

const signIn = async (req, res) => {
    const { userName, password } = req.body;

    const accessToken = await userService.signIn(userName, password);

    res.status(200).json({ authorization: accessToken , message: "SUCCESS"});
}

const loadUserInfo = async (req, res) => {
    const userName = req.user.name;

    const user = await userService.loadUserInfo(userName);

    res.status(200).json({ user: user });
}



module.exports = {
    signUp,
    signIn,
    loadUserInfo
}
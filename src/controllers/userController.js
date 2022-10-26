const userService = require('../services/userService');
const AppError = require('../middlewares/appError');

const signUp = async (req, res) => {
    const { userName, password, name, email, phoneNumber, birth } = req.body;

    if (!userName || !password || !name || !email || !phoneNumber || !birth) throw new AppError('KEY_ERROR', 400);

    await userService.signUp(userName, password, name, email, phoneNumber, birth);

    res.status(201).json({ message: 'SIGNUP_SUCCESS' });
}

const signIn = async (req, res) => {
    const { userName, password } = req.body;

    const accessToken = await userService.signIn(userName, password);

    res.status(200).json({ authorization: accessToken});
}

const getUserInfo = async (req, res) => {
    const userId = req.user.id;

    const user = await userService.getUserInfo(userId);

    res.status(200).json(user);
}



module.exports = {
    signUp,
    signIn,
    getUserInfo
}
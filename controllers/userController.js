const userService = require('../services/userService');

const signUp = async (req, res) => {
    try {
        const { userId, password, name, email, phoneNumber, birth } = req.body;

        if (!userId || !password || !name || !email || !phoneNumber || !birth) {
            return res.status(404).json({ message: "KEY_ERROR" });
        }

        await userService.signUp(userId, password, name, email, phoneNumber, birth);

        res.status(201).json({ message: 'SIGNUP_SUCCESS' });
    } catch (err) {
        return res.status(err.statusCode || 500).json({ message: err.message });
    }
}

const signIn = async (req, res) => {
    try {
        const { userId, password } = req.body;

        const accessToken = await userService.signIn(userId, password);

        res.status(200).json({ authorization: accessToken });
    } catch (err) {
        res.status(err.statusCode ? err.statusCode : 401).json({ message: err.message });
    }
}

const loadUserInfo = async (req, res) => {
    const { userId } = req.body;
    console.log(userId);

    const user = await userService.loadUserInfo(userId);

    res.status(200).json({ user: user });
}



module.exports = {
    signUp,
    signIn,
    loadUserInfo
}
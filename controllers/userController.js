const userService = require('../services/userService');

const signUp = async (req, res) => {
    try {
        const { userName, password, name, email, phoneNumber, birth } = req.body;

        if (!userName || !password || !name || !email || !phoneNumber || !birth) {
            return res.status(400).json({ message: "KEY_ERROR" });
        }

        await userService.signUp(userName, password, name, email, phoneNumber, birth);

        res.status(201).json({ message: 'SIGNUP_SUCCESS' });
    } catch (err) {
        return res.status(err.statusCode || 500).json({ message: err.message });
    }
}

const signIn = async (req, res) => {
    try {
        const { userName, password } = req.body;

        const accessToken = await userService.signIn(userName, password);

        res.status(200).json({ authorization: accessToken });
    } catch (err) {
        res.status(err.statusCode ? err.statusCode : 401).json({ message: err.message });
    }
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
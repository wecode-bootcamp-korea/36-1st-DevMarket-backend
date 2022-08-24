const cartService = require("../services/cartService");
const appError = require('../middlewares/appError');

const getCartLists = async(req, res) => {
        const userId = req.user.id;
        if(!userId) throw new appError('KEY_ERROR', 400);
        const list = await cartService.getCartLists(userId);
        return res.status(200).json(list);
};

module.exports = {
    getCartLists
}
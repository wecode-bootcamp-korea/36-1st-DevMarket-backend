const cartService = require("../services/cartService");
const appError = require('../middlewares/appError');

const getCartLists = async(req, res) => {
    const userId = req.user.id;

    if(!userId) throw new appError('KEY_ERROR', 400);

    const list = await cartService.getCartLists(userId);

    return res.status(200).json(list);
};

const addProduct = async(req, res) => {
    const {userId, productId, amount} = req.body;

    if(!userId || !productId ||!amount) throw new appError('KEY_ERROR', 400);

    await cartService.addProduct(userId, productId, amount);
    
    return res.status(201).json({message : "PRODUCT_ADDED"})
};

module.exports = {
    getCartLists,
    addProduct
}
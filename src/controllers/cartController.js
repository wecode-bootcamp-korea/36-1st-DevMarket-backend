const cartService = require("../services/cartService");
const AppError = require('../middlewares/appError');

const getCartLists = async (req, res) => {
    const userId = req.user.id;

    if (!userId) throw new AppError('KEY_ERROR', 400);

    const list = await cartService.getCartLists(userId);

    res.status(200).json(list);
};

const addProduct = async (req, res) => {
    const { amount } = req.body;

    const { productId } = req.params;

    const userId = req.user.id;

    if (!userId || !productId || !amount) throw new AppError('KEY_ERROR', 400);

    await cartService.addProduct(userId, productId, amount);

    res.status(201).json({ message: "PRODUCT_ADDED" })
};

const deleteCart = async (req, res) => {
    const { productId } = req.params;

    const userId = req.user.id;

    if (!userId || !productId) throw new AppError('KEY_ERROR', 400);

    await cartService.deleteCart(userId, productId);

    res.status(200).json({ message: "CART_DELETED" })
};

const updateAmount = async (req, res) => {

    const { amount } = req.body;

    const { productId } = req.params;

    const userId = req.user.id;

    if (!userId || !productId || !amount) throw new AppError('KEY_ERROR', 400);

    await cartService.updateAmount(userId, productId, amount);

    res.status(201).json({ message: "AMOUNT_UPDATED" });
};

module.exports = {
    getCartLists,
    addProduct,
    deleteCart,
    updateAmount
}
const cartService = require("../services/cartService");
const AppError = require('../middlewares/appError');

const getCartList = async (req, res) => {
    const userId = req.user.id;

    if (!userId) throw new AppError('KEY_ERROR', 400);

    const list = await cartService.getCartList(userId);

    res.status(200).json(list);
};

const addProduct = async (req, res) => {
    const { amount } = req.body;

    const { productId } = req.params;

    const userId = req.user.id;

    if (!userId || !productId || !amount) throw new AppError('KEY_ERROR', 400);

    await cartService.addProduct(userId, productId, amount);

    res.status(201).json({ message: "CART_ADDED" })
};

const deleteCart = async (req, res) => {
    const { cartId } = req.params;

    if (!cartId) throw new AppError('KEY_ERROR', 400);

    await cartService.deleteCart(cartId);

    res.status(200).json({ message: "CART_DELETED" })
};

const updateAmount = async (req, res) => {
    const { amount } = req.body;

    const { cartId } = req.params;

    if (!cartId || !amount) throw new AppError('KEY_ERROR', 400);

    await cartService.updateAmount(cartId, amount);

    res.status(201).json({ message: "AMOUNT_UPDATED" });
};

module.exports = {
    getCartList,
    addProduct,
    deleteCart,
    updateAmount
}
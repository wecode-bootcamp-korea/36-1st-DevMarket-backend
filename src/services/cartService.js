const cartDao = require("../models/cartDao");
const AppError = require('../middlewares/appError');

const getCartList = async (userId) => await cartDao.getCartList(userId);

const deleteCart = async (cartId) => await cartDao.deleteCart(cartId);

const updateAmount = async (cartId, amount) => await cartDao.updateAmount(cartId, amount);

const addProduct = async (userId, productId, amount) => {
    const checkCartList = await cartDao.checkCartList(userId, productId);

    if (!checkCartList) await cartDao.addProduct(userId, productId, amount);

    else throw new AppError('INVALID_DATA_INPUT', 409);
};

module.exports = {
    getCartList,
    addProduct,
    deleteCart,
    updateAmount
}
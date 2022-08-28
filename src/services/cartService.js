const cartDao = require("../models/cartDao");
const AppError = require('../middlewares/appError');

const getCartLists = async (userId) => await cartDao.getProductsList(userId);

const deleteCart = async (userId, productId) => await cartDao.deleteCart(userId, productId);

const updateAmount = async (userId, productId, amount) => await cartDao.updateAmount(userId, productId, amount);

const addProduct = async (userId, productId, amount) => {
    const checkCartList = await cartDao.checkCartList(userId, productId);

    if (!checkCartList) await cartDao.addProduct(userId, productId, amount);

    else throw new AppError('INVALID_DATA_INPUT', 409);
};

module.exports = {
    getCartLists,
    addProduct,
    deleteCart,
    updateAmount
}
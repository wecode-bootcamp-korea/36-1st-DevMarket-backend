const cartDao = require("../models/cartDao");

const cartList = async(userId) => {
    const list = await cartDao.productList(
        userId
    );

    return list;
};

const addProduct = async(userId, productId, amount) => {
    const addProduct = await cartDao.addProduct(
        userId,
        productId,
        amount
    );

    return addProduct;
};

const deleteCart = async(userId) => {
    const deleteCart = await cartDao.deleteCart(
        userId
    );

    return deleteCart;
};

const updateAmount = async(userId, productId, amount) => {
    const updateAmount = await cartDao.updateAmount(
        userId,
        productId,
        amount
    );

    return updateAmount;
};

module.exports = {
    cartList,
    addProduct,
    deleteCart,
    updateAmount
}
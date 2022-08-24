const cartDao = require("../models/cartDao");

const getCartLists = async (userId) => await cartDao.getProductsList(userId);

const addProduct = async(userId, productId, amount) => await cartDao.addProduct(userId, productId, amount);

module.exports = {
    getCartLists,
    addProduct
}
const cartDao = require("../models/cartDao");
const appError = require('../middlewares/appError');

const getCartLists = async (userId) => await cartDao.getProductsList(userId);

const addProduct = async(userId, productId, amount) => {
    const checkCartList = await cartDao.checkCartList(userId, productId);
    if(!checkCartList) { 
        const addProduct = await cartDao.addProduct(userId, productId, amount);
        return addProduct;
    } else {
        throw new appError('INVALID_DATA_INPUT', 409);
    };
};

module.exports = {
    getCartLists,
    addProduct
}
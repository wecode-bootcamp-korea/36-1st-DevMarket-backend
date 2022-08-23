const cartDao = require("../models/cartDao");

const getCartLists = async (userId) => await cartDao.getProductsList(userId);

module.exports = {
    getCartLists
}
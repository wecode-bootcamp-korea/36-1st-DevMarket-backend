const cartDao = require("../models/cartDao");

const cartList = async(userId) => {
    const list = await cartDao.productList(
        userId
    );

    return list;
};

module.exports = {
    cartList
}
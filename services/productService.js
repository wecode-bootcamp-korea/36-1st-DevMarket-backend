const productDao = require('../models/productDao');
const userDao = require('../models/userDao');
const appError = require('../middlewares/appError');

const createReview = async (content, userId, productId) => {
    const user = await userDao.getUserById(userId);
    const product = await productDao.getProductById(productId);

    if (!user || !product) throw new appError('DATA_EXIST', 409);

    await productDao.createReview(content, userId, productId);
}

module.exports = {
    createReview,
}
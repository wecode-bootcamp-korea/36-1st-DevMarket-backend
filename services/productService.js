const productDao = require('../models/productDao');
const userDao = require('../models/userDao');
const appError = require('../middlewares/appError');

const createReview = async (content, userIdCode, productId) => {
    const user = await userDao.getUserById(userIdCode);
    const product = await productDao.getProductById(productId);

    if (!user || !product) throw new appError('DATA_EXIST', 409);

    await productDao.createReview(content, userIdCode, productId);
}

module.exports = {
    createReview,
}
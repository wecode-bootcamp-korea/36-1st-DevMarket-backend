const productDao = require('../models/productDao');
const appError = require('../middlewares/appError');

const createReview = async (content, userId, productId) => {
    const product = await productDao.getProductById(productId);

    if (!product) throw new appError('DATA_EXIST', 409);

    await productDao.createReview(content, userId, productId);
}

module.exports = {
    createReview,
}
const productDao = require('../models/productDao');
const appError = require('../middlewares/appError');

const createReview = async (content, userId, productId) => {
    const product = await productDao.getProductById(productId);

    if (!product) throw new appError('DATA_EXIST', 409);

    await productDao.createReview(content, userId, productId);
}

const loadReviews = async (productId, _start, _limit) => {
    const product = await productDao.getProductById(productId);

    if (!product) throw new appError('PRODUCT_NOT_EXIST', 409);

    return await productDao.loadReviews(productId, parseInt(_start), parseInt(_limit));
}


module.exports = {
    createReview,
    loadReviews
}
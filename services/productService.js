const productDao = require('../models/productDao');
const validation = require('../utils/validators');
const appError = require('../middlewares/appError');

const createReview = async (content, userId, productId) => {
    const product = await productDao.getProductById(productId);

    if (!product) throw new appError('DATA_EXIST', 409);

    await productDao.createReview(content, userId, productId);
}

const getReviews = async (productId, start, limit) => {
    const product = await productDao.getProductById(productId);

    if (!product) throw new appError('PRODUCT_NOT_EXIST', 409);

    validation.validatePageNationValue(start, limit);

    return await productDao.getReviews(productId, parseInt(start), parseInt(limit));
}


module.exports = {
    createReview,
    getReviews
}
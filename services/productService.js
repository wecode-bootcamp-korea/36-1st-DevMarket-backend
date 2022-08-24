const productDao = require('../models/productDao');
const appError = require('../middlewares/appError');

const createReview = async (content, userId, productId) => {
    const product = await productDao.getProductById(productId);

    if (!product) throw new appError('DATA_EXIST', 409);

    await productDao.createReview(content, userId, productId);
}

const getReviews = async (productId, start, limit) => {
    const product = await productDao.getProductById(productId);

    if (!product) throw new appError('PRODUCT_NOT_EXIST', 409);

    return await productDao.getReviews(productId, parseInt(start), parseInt(limit));
}

const deleteReview = async (reviewId) => {
    const review = await productDao.getReviewById(reviewId);

    if (!review) throw new appError('REVIEW_NOT_EXIST', 409);

    await productDao.deleteReview(reviewId);
}

const updateReview = async (content, reviewId) => {
    const review = await productDao.getReviewById(reviewId);

    if (!review) throw new appError('REVIEW_NOT_EXIST', 409);

    await productDao.updateReview(content, reviewId);
}

module.exports = {
    createReview,
    getReviews,
    deleteReview,
    updateReview
}
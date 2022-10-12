const productDao = require('../models/productDao');
const reviewDao = require('../models/ReviewDao')
const validation = require('../utils/validators');
const AppError = require('../middlewares/appError');

const createReview = async (content, userId, productId) => {
    const product = await productDao.getProductById(productId);

    if (!product) throw new AppError('DATA_NOT_EXIST', 409);

    await reviewDao.createReview(content, userId, productId);
}

const getReviews = async (productId, offset, limit) => {
    const product = await productDao.getProductById(productId);

    if (!product) throw new AppError('PRODUCT_NOT_EXIST', 409);

    validation.limitValidation(limit);
    validation.offSetValidation(offset);

    return await reviewDao.getReviews(productId, parseInt(offset), parseInt(limit));
}

const deleteReview = async (reviewId) => {
    const review = await reviewDao.getReviewById(reviewId);

    if (!review) throw new AppError('REVIEW_NOT_EXIST', 409);

    await reviewDao.deleteReview(reviewId);
}

const updateReview = async (content, reviewId) => {
    const review = await reviewDao.getReviewById(reviewId);

    if (!review) throw new AppError('REVIEW_NOT_EXIST', 409);

    await reviewDao.updateReview(content, reviewId);
}

module.exports = {
    createReview,
    getReviews,
    deleteReview,
    updateReview,
}
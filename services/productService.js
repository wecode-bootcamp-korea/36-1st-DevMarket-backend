const productDao = require('../models/productDao');
const userDao = require('../models/userDao');

const createReview = async (content, userId, productId) => {
    const user = await userDao.getUserById(userId);
    const product = await productDao.getProductById(productId);

    if (!user || !product) {
        const err = new Error("DATA_EXIST");
        err.statusCode = 409;
        throw err;
    }

    await productDao.createReview(content, userId, productId);
}

const loadReviews = async (productId) => {
    const product = await productDao.getProductById(productId);

    if (!product) {
        const err = new Error("PRODUCT_NOT_EXIST");
        err.statusCode = 409;
        throw err;
    }

    const review = await productDao.loadReviews(productId);

    return review;
}

const deleteReview = async (reviewId) => {
    const review = await productDao.getReviewById(reviewId);

    if (!review) {
        const err = new Error("REVIEW_NOT_EXIST");
        err.statusCode = 409;
        throw err;
    }

    await productDao.deleteReview(reviewId);
}

const updateReview = async (content, reviewId) => {
    const review = await productDao.getReviewById(reviewId);

    if (!review) {
        const err = new Error("REVIEW_NOT_EXIST");
        err.statusCode = 409;
        throw err;
    }

    await productDao.updateReview(content, reviewId);
}

module.exports = {
    createReview,
    loadReviews,
    deleteReview,
    updateReview
}
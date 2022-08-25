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

    if (start === "null") start = "0";

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

const loadProductList = async (start, limit) => {
    if (!start && !limit) { start = 0; limit = 30; };

    return await productDao.loadProductList(parseInt(start), parseInt(limit));
};

const getProductDetail = async (productId) => await productDao.loadProductDetail(productId);

const getProductsByAsc = async (start, limit) => {
    if (!start && !limit) { start = 0; limit = 30; };

    return await productDao.getProductsByAsc(parseInt(start), parseInt(limit));
};

const getProductsByDesc = async (start, limit) => {
    if (!start && !limit) { start = 0; limit = 30; };

    return await productDao.getProductsByDesc(parseInt(start), parseInt(limit));
};

const getProductsByCategories = async (cate, prod, start, limit) => {
    if (cate == 1) return await productDao.getProductsByHighCate(prod, start, limit);

    else if (cate == 2) return await productDao.getProductsByMiddleCate(prod, start, limit);

    else if (cate == 3) return await productDao.getProductsByLowCate(prod, start, limit);

    else throw new appError('INVALID_DATA_INPUT', 409);
};

const addProductAmount = async (userId, productId, amount) => {
    const checkProductAmount = await productDao.checkProductAmount(userId, productId);

    if (checkProductAmount) return await cartDao.updateAmount(userId, productId, amount);

    else if (!checkProductAmount) return await cartDao.addProduct(userId, productId, amount);

    else throw new appError('INVALID_DATA_INPUT', 409);
};

module.exports = {
    createReview,
    getReviews,
    deleteReview,
    updateReview,
    loadProductList,
    getProductDetail,
    getProductsByAsc,
    getProductsByDesc,
    getProductsByCategories,
    addProductAmount
}
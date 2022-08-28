const productDao = require('../models/productDao');
const cartDao = require('../models/cartDao')
const validation = require('../utils/validators');
const AppError = require('../middlewares/appError');

const createReview = async (content, userId, productId) => {
    const product = await productDao.getProductById(productId);

    if (!product) throw new AppError('DATA_EXIST', 409);

    await productDao.createReview(content, userId, productId);
}

const getReviews = async (productId, offset, limit) => {
    const product = await productDao.getProductById(productId);

    if (!product) throw new AppError('PRODUCT_NOT_EXIST', 409);

    validation.limitValidation(limit);
    validation.offSetValidation(offset);

    return await productDao.getReviews(productId, parseInt(offset), parseInt(limit));
}

const deleteReview = async (reviewId) => {
    const review = await productDao.getReviewById(reviewId);

    if (!review) throw new AppError('REVIEW_NOT_EXIST', 409);

    await productDao.deleteReview(reviewId);
}

const updateReview = async (content, reviewId) => {
    const review = await productDao.getReviewById(reviewId);

    if (!review) throw new AppError('REVIEW_NOT_EXIST', 409);

    await productDao.updateReview(content, reviewId);
}

const loadProductList = async (offset, limit) => {
    validation.limitValidation(limit);
    validation.offSetValidation(offset);

    return await productDao.loadProductList(parseInt(offset), parseInt(limit));
};

const getProductDetail = async (productId) => await productDao.loadProductDetail(productId);

const getProductsByAsc = async (offset, limit) => {
    validation.limitValidation(limit);
    validation.offSetValidation(offset);

    return await productDao.getProductsByAsc(parseInt(offset), parseInt(limit));
};

const getProductsByDesc = async (offset, limit) => {
    validation.limitValidation(limit);
    validation.offSetValidation(offset);

    return await productDao.getProductsByDesc(parseInt(offset), parseInt(limit));
};

const getProductsByCategories = async (cate, prod, offset, limit) => {
    if (cate == 1) return await productDao.getProductsByHighCate(prod, offset, limit);

    else if (cate == 2) return await productDao.getProductsByMiddleCate(prod, offset, limit);

    else if (cate == 3) return await productDao.getProductsByLowCate(prod, offset, limit);

    else throw new AppError('INVALID_DATA_INPUT', 409);
};

const addProductAmount = async (userId, productId, amount) => {
    const checkProductAmount = await productDao.checkProductAmount(userId, productId);

    if (checkProductAmount) return await cartDao.updateAmount(userId, productId, amount);

    else if (!checkProductAmount) return await cartDao.addProduct(userId, productId, amount);

    else throw new AppError('INVALID_DATA_INPUT', 409);
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
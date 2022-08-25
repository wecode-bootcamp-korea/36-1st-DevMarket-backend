const productDao = require('../models/productDao');
const cartDao = require("../models/cartDao");
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

const loadProductList = async(start, limit) => {
    if ( !start && !limit ) { start = 0; limit = 30; };

    const loadProductList = await productDao.loadProductList(parseInt(start),parseInt(limit));

    return loadProductList;
};

const getProductDetail = async (productId) => await productDao.loadProductDetail(productId);

const getProductsByAsc = async(start, limit) => {
    if ( !start && !limit ) { start = 0; limit = 30; };

    const getProductsByAsc = await productDao.getProductsByAsc(parseInt(start),parseInt(limit));

    return getProductsByAsc;
};

const getProductsByDesc = async(start, limit) => {
    if ( !start && !limit ) { start = 0; limit = 30; };
    
    const getProductsByDesc = await productDao.getProductsByDesc(parseInt(start),parseInt(limit));

    return getProductsByDesc;
};

const getProductsByCategories = async(cate, prod, start, limit) => {
    if (cate == 1) {

        const getProductsByHighCate = await productDao.getProductsByHighCate(prod, start, limit);

        return getProductsByHighCate;

    } else if (cate == 2) {

        const getProductsByMiddleCate = await productDao.getProductsByMiddleCate(prod, start, limit);

        return getProductsByMiddleCate;

    } else if (cate == 3) {

        const getProductsByLowCate = await productDao.getProductsByLowCate(prod, start, limit);

        return getProductsByLowCate;

    } else {

        throw new AppError('INVALID_DATA_INPUT', 409);
    };
};

const addProductAmount = async (userId, productId, amount) => {
    const checkProductAmount = await productDao.checkProductAmount(userId,productId);

    if (checkProductAmount) {

        const updateAmount = await cartDao.updateAmount(userId, productId, amount);

        return updateAmount;

    } else if (!checkProductAmount) {

        const addProduct = await cartDao.addProduct(userId, productId, amount);

        return addProduct;

    } else {

        throw new AppError('INVALID_DATA_INPUT', 409);
    };
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
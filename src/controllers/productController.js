const productService = require('../services/productService');
const AppError = require('../middlewares/appError');

const createReview = async (req, res) => {
    const { content } = req.body;
    const { productId } = req.params;
    const userId = req.user.id;

    if (!content || !productId) throw new AppError('KEY_ERROR', 400);

    await productService.createReview(content, userId, productId);

    res.status(201).json({ message: 'REVIEW_CREATED' });
}

const getReviews = async (req, res) => {
    const { productId } = req.params;
    const { offset, limit } = req.query;

    if (!productId || !limit || !offset) throw new AppError('KEY_ERROR', 400);

    const reviews = await productService.getReviews(productId, offset, limit);

    res.status(200).json(reviews);
}

const deleteReview = async (req, res) => {
    const { reviewId } = req.params;

    if (!reviewId) throw new AppError('KEY_ERROR', 400);

    await productService.deleteReview(reviewId);

    res.status(200).json({ message: "DELETE_SUCCESS" })
}

const updateReview = async (req, res) => {

    const { content } = req.body;
    const { reviewId } = req.params

    if (!content) throw new AppError('KEY_ERROR', 400);

    await productService.updateReview(content, reviewId);

    res.status(200).json({ message: "UPDATE_SUCCESS" });
}

const loadProductList = async (req, res) => {
    const { offset, limit } = req.query;

    if (!offset || !limit) throw new AppError('KEY_ERROR', 400);

    const list = await productService.loadProductList(offset, limit);
    offset
    res.status(200).json(list);
};

const getProductDetail = async (req, res) => {
    const { productId } = req.params;

    if (!productId) throw new AppError('KEY_ERROR', 400);

    const product = await productService.getProductDetail(productId);

    res.status(200).json(product);
};

const getProductsByAsc = async (req, res) => {
    const { offset, limit } = req.query;

    if (!offset || !limit) throw new AppError('KEY_ERROR', 400);

    const list = await productService.getProductsByAsc(offset, limit);

    res.status(200).json(list);
};

const getProductsByDesc = async (req, res) => {
    const { offset, limit } = req.query;

    if (!offset || !limit) throw new AppError('KEY_ERROR', 400);

    const list = await productService.getProductsByDesc(offset, limit);

    res.status(201).json(list);
};

const getProductsByCategories = async (req, res) => {
    const { cate, prod, offset, limit } = req.query;

    if (!cate || !prod || !offset || !limit) throw new AppError('KEY_ERROR', 400);

    const list = await productService.getProductsByCategories(cate, prod, offset, limit);

    res.status(200).json(list);
};

const addProductAmount = async (req, res) => {
    const userId = req.user.id

    const { productId, amount } = req.body;

    if (!userId || !productId || !amount) throw new AppError('KEY_ERROR', 400);

    await productService.addProductAmount(userId, productId, amount);

    res.status(201).json({ message: "PRODUCT_ADDED" })
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
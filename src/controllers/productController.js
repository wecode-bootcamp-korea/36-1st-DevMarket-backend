const productService = require('../services/productService');
const AppError = require('../middlewares/appError');

const loadProductList = async (req, res) => {
    const { offset, limit } = req.body;

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
    const { offset, limit } = req.body;

    if (!offset || !limit) throw new AppError('KEY_ERROR', 400);

    const list = await productService.getProductsByAsc(offset, limit);

    res.status(200).json(list);
};

const getProductsByDesc = async (req, res) => {
    const { offset, limit } = req.body;

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
    loadProductList,
    getProductDetail,
    getProductsByAsc,
    getProductsByDesc,
    getProductsByCategories,
    addProductAmount
}
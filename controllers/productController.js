const prodcutService = require('../services/productService');
const appError = require('../middlewares/appError');

const createReview = async (req, res) => {
    const { content, userId, } = req.body;

    const { productId } = req.params;

    if (!content || !userId || !productId) throw new appError('KEY_ERROR', 400);

    await prodcutService.createReview(content, userId, productId);

    res.status(201).json({ message: 'REVIEW_CREATED' });
}

module.exports = {
    createReview
}
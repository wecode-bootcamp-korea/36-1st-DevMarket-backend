const prodcutService = require('../services/productService');
const appError = require('../middlewares/appError');

const createReview = async (req, res) => {
    const { content, userIdCode, } = req.body;

    const { productId } = req.params;

    if (!content || !userIdCode || !productId) throw new appError('KEY_ERROR', 400);

    await prodcutService.createReview(content, userIdCode, productId);

    res.status(201).json({ message: 'REVIEW_CREATED' });
}

module.exports = {
    createReview
}
const prodcutService = require('../services/productService');
const appError = require('../middlewares/appError');

const createReview = async (req, res) => {
    const { content } = req.body;
    const { productId } = req.params;
    const userId = req.user.id;

    if (!content || !productId) throw new appError('KEY_ERROR', 400);

    await prodcutService.createReview(content, userId, productId);

    res.status(201).json({ message: 'REVIEW_CREATED' });
}

const loadReviews = async (req, res) => {
    const { productId } = req.params;
    const { _start, _limit } = req.query;

    const reviews = await prodcutService.loadReviews(productId, _start, _limit);

    res.status(200).json(reviews);
}

module.exports = {
    createReview,
    loadReviews
}
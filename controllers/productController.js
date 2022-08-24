const productService = require('../services/productService');
const appError = require('../middlewares/appError');

const createReview = async (req, res) => {
    const { content } = req.body;
    const { productId } = req.params;
    const userId = req.user.id;

    if (!content || !productId) throw new appError('KEY_ERROR', 400);

    await productService.createReview(content, userId, productId);

    res.status(201).json({ message: 'REVIEW_CREATED' });
}

const getReviews = async (req, res) => {
    const { productId } = req.params;
    const { start, limit } = req.query;

    if (!productId || !start || !limit) throw new appError('KEY_ERROR', 400);

    const reviews = await productService.getReviews(productId, _start, _limit);

    res.status(200).json(reviews);
}

const deleteReview = async (req, res) => {
    const { reviewId } = req.params;

    if (!reviewId) throw new appError('KEY_ERROR', 400);

    await productService.deleteReview(reviewId);

    res.status(200).json({ message: "DELETE_SUCCESS" })
}

const updateReview = async (req, res) => {

    const { content } = req.body;
    const { reviewId } = req.params

    if (!content) throw new appError('KEY_ERROR', 400);

    await productService.updateReview(content, reviewId);

    res.status(200).json({ message: "UPDATE_SUCCESS" });
}

module.exports = {
    createReview,
    getReviews,
    deleteReview,
    updateReview
}
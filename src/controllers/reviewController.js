const reviewService = require('../services/ReviewService');
const AppError = require('../middlewares/appError');

const createReview = async (req, res) => {
    const { content } = req.body;
    const { productId } = req.params;
    const userId = req.user.id;

    if (!content || !productId) throw new AppError('KEY_ERROR', 400);

    await reviewService.createReview(content, userId, productId);

    res.status(201).json({ message: 'REVIEW_CREATED' });
}

const getReviews = async (req, res) => {
    const { productId } = req.params;
    const { offset, limit } = req.query;

    if (!productId || !limit || !offset) throw new AppError('KEY_ERROR', 400);

    const reviews = await reviewService.getReviews(productId, offset, limit);

    res.status(200).json(reviews);
}

const deleteReview = async (req, res) => {
    const { reviewId } = req.params;

    if (!reviewId) throw new AppError('KEY_ERROR', 400);

    await reviewService.deleteReview(reviewId);

    res.status(200).json({ message: "DELETE_SUCCESS" })
}

const updateReview = async (req, res) => {

    const { content } = req.body;
    const { reviewId } = req.params

    if (!content) throw new AppError('KEY_ERROR', 400);

    await reviewService.updateReview(content, reviewId);

    res.status(200).json({ message: "UPDATE_SUCCESS" });
}

module.exports = {
    createReview,
    getReviews,
    deleteReview,
    updateReview,
}
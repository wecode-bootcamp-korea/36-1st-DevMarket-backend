const prodcutService = require('../services/productService');

const createReview = async (req, res) => {
    try {
        const { content, userIdCode, productId } = req.body;

        if (!content || !userIdCode || !productId) {
            return res.status(400).json({ message: "KEY_ERROR" });
        }

        await prodcutService.createReview(content, userIdCode, productId);

        res.status(201).json({ message: 'REVIEW_CREATED' });
    } catch (err) {
        return res.status(err.statusCode || 500).json({ message: err.message });
    }
}

const loadReviews = async (req, res) => {
    try {
        const { productId } = req.body;

        const reviews = await prodcutService.loadReviews(productId);

        res.status(200).json({ reviews: reviews });
    } catch (err) {
        return res.status(err.statusCode || 500).json({ message: err.message });
    }
}

const deleteReview = async (req, res) => {
    try {
        const { reviewId } = req.body;

        await prodcutService.deleteReview(reviewId);

        res.status(200).json({ message: "DELETE_SUCCESS" })
    } catch (err) {
        return res.status(err.statusCode || 500).json({ message: err.message });
    }
}

const updateReview = async (req, res) => {
    try {
        const { content, reviewId } = req.body;

        if (!content) {
            return res.status(404).json({ message: "KEY_ERROR" });
        }

        await prodcutService.updateReview(content, reviewId);

        res.status(200).json({ message: "UPDATE_SUCCESS" });
    } catch (err) {
        return res.status(err.statusCode || 500).json({ message: err.message });
    }
}

module.exports = {
    createReview,
    loadReviews,
    deleteReview,
    updateReview
}
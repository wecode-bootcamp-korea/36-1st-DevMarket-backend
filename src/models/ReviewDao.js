const { AppDataSource } = require('./dataSource');
const AppError = require('../middlewares/appError');

const createReview = async (content, userId, productId) => {
    try {
        await AppDataSource.query(`
            INSERT INTO reviews(
                content,
                user_id,
                product_id
            ) VALUES (?, ?, ?)`,
            [content, userId, productId]
        );
    } catch (err) {
        throw new AppError('INVALID_DATA_INPUT', 500);
    }
}

const getReviews = async (productId, offset, limit) => {
    try {
        return await AppDataSource.query(`
            SELECT
                reviews.id,
                reviews.content,
                reviews.product_id,
                users.name,
                users.user_name
            FROM reviews
            INNER JOIN users ON (reviews.product_id = ${productId}
            AND users.id = reviews.user_id)
            ORDER BY reviews.id DESC
            LIMIT ${limit} OFFSET ${offset}`
        );
    } catch (err) {
        throw new AppError('INVALID_DATA_INPUT', 500);
    }
}

const deleteReview = async (reviewId) => {
    try {
        const deleteRows = (await AppDataSource.query(`
            DELETE FROM reviews
            WHERE reviews.id = ${reviewId}`
        )).affectedRows;
        if (deleteRows !== 0 && deleteRows !== 1) throw new AppError('UNEXPECTED_NUMBER_OF_RECORDS_DELETED', 500)

    } catch (err) {
        throw new AppError('INVALID_DATA_INPUT', 500)
    }
}

const updateReview = async (content, reviewId) => {
    try {
        await AppDataSource.query(`
            UPDATE reviews
                SET content = ?
            WHERE id = ${reviewId}`,
            [content, reviewId]
        );
    } catch (err) {
        throw new AppError('INVALID_DATA_INPUT', 500)
    }
}

const getReviewById = async (reviewId) => {
    const [review] = await AppDataSource.query(`
        SELECT
            id,
            content,
            user_id,
            product_id
        FROM reviews
        WHERE id = ?`,
        [reviewId]
    );

    return review;
}

module.exports = {
    createReview,
    getReviews,
    deleteReview,
    getReviewById,
    updateReview
}
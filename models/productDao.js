const { AppDataSource } = require('./dataSource');

const createReview = async (content, userIdCode, productId) => {
    try {
        await AppDataSource.query(`
            INSERT INTO reviews(
                content,
                user_id,
                product_id
            ) VALUES (?, ?, ?)`,
            [content, userIdCode, productId]
        );
    } catch (err) {
        const error = new Error('INVALID_DATA');
        error.statusCode = 500;
        throw error;
    }
}

const loadReviews = async (productId) => {
    try {
        return await AppDataSource.query(`
            SELECT
                id,
                content,
                user_id,
                product_id
            FROM reviews
            WHERE product_id = ${productId}`
        );
    } catch (err) {
        const error = new Error('INVALID_DATA');
        error.statusCode = 500;
        throw error;
    }
}

const deleteReview = async (reviewId) => {
    try {
        await AppDataSource.query(`
            DELETE FROM reviews
            WHERE reviews.id = ${reviewId}`
        );
    } catch (err) {
        const error = new Error('INVALID_DATA');
        error.statusCode = 500;
        throw error;
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
        const error = new Error('INVALID_DATA');
        error.statusCode = 500;
        throw error;
    }
}

const getProductById = async (productId) => {
    const [product] = await AppDataSource.query(`
        SELECT
            id,
            name,
            weight,
            price,
            made_in
        FROM products
        WHERE id = ?`,
        [productId]
    );

    return product;
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
    loadReviews,
    deleteReview,
    updateReview,
    getProductById,
    getReviewById
}
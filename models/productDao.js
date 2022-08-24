const { AppDataSource } = require('./dataSource');
const appError = require('../middlewares/appError');

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
        throw new appError('INVALID_DATA_INPUT', 500);
    }
}

const getReviews = async (productId, start, limit) => {
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
            LIMIT ${limit} OFFSET ${start}`
        );
    } catch (err) {
        throw new appError('INVALID_DATA_INPUT', 500);
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

module.exports = {
    createReview,
    getProductById,
    getReviews
}
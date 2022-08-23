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
    getProductById
}
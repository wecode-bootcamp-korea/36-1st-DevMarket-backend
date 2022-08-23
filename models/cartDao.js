const { AppDataSource } = require("../models/dataSource");

const productList = async (userId) => {
    try {
        return await AppDataSource.query(
            `SELECT
                    cart.user_id,
                    cart.product_id,
                    cart.amount,
                    products.name,
                    products.price,
                    products.image,
                    products.weight,
                    products.made_in
            FROM cart
            INNER JOIN products ON cart.product_id = products.id
            WHERE user_id = ${userId};
            `);
    } catch (err) {
        const error = new Error('INVALID_DATA_INPUT');
        error.statusCode = 500;
        throw error;
    };
};

module.exports = {
    productList
}
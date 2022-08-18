const { AppDataSource } = require("../models/dataSource");

const productList = async (userId) => {
    try {
        return await AppDataSource.query(
            `SELECT
                    user_id,
                    product_id,
                    amount
            FROM cart
            WHERE user_id = ${userId};
            `);
    } catch (err) {
        const error = new Error('INVALID_DATA_INPUT');
        error.statusCode = 500;
        throw error;
    };
};

const addProduct = async (userId, productId, amount) => {
    try {
        return await AppDataSource.query(
            `INSERT INTO cart(
                user_id,
                product_id,
                amount
            ) VALUES (?, ?, ?);
            `, [userId, productId, amount]);
    } catch (err) {
        const error = new Error('INVALID_DATA_INPUT');
        error.statusCode = 500;
        throw error;
    };
};

const deleteCart = async (userId) => {
    try {
        await AppDataSource.query(
            `DELETE FROM cart
               WHERE user_id = ${userId};
           `);
    } catch (err) {
        const error = new Error('INVALID_DATA_INPUT');
        error.statusCode = 500;
        throw error;
    };
};

const updateAmount = async (userId, productId, amount) => {
    try {
        await AppDataSource.query(
            `UPDATE cart
            SET
                amount = amount + ${amount}
            WHERE user_id = ${userId} AND product_id = ${productId};
            `);
    } catch (err) {
        const error = new Error('INVALID_DATA_INPUT');
        error.statusCode = 500;
        throw error;
    };
};

module.exports = {
    productList,
    addProduct,
    deleteCart,
    updateAmount
}
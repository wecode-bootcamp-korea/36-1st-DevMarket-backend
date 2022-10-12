const { AppDataSource } = require("../models/dataSource");
const AppError = require('../middlewares/appError');

const getCartList = async (userId) => {
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
        throw new AppError('INVALID_DATA_INPUT', 500);
    };
};

const addProduct = async (userId, productId, amount) => {
    try {
        await AppDataSource.query(
            `INSERT INTO cart(
                user_id,
                product_id,
                amount
            ) VALUES (?, ?, ?);
            `, [userId, productId, amount]);
    } catch (err) {
        throw new AppError('INVALID_DATA_INPUT', 500);
    };
};

const deleteCart = async (cartId) => {
    try {
        await AppDataSource.query(
            `DELETE FROM cart
               WHERE id = ${cartId}
           `);
    } catch (err) {
        throw new AppError('INVALID_DATA_INPUT', 500);
    };
};

const updateAmount = async (cartId, amount) => {
    try {
        await AppDataSource.query(
            `UPDATE cart
            SET
                amount = amount + ${amount}
            WHERE id = ${cartId}
            `);
    } catch (err) {
        throw new AppError('INVALID_DATA_INPUT', 500);
    };
};

const checkCartList = async (userId, productId) => {
    try {
        const [check] = await AppDataSource.query(
            `SELECT
                user_id,
                product_id
        FROM cart
        WHERE user_id = ${userId}
        AND product_id = ${productId};
        `);
        return check;
    } catch (err) {
        throw new AppError('INVALID_DATA_INPUT', 500);
    };
};

module.exports = {
    getCartList,
    addProduct,
    checkCartList,
    deleteCart,
    updateAmount
}
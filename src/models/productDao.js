const { AppDataSource } = require('./dataSource');
const AppError = require('../middlewares/appError');

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

const loadProductList = async (offset, limit) => {
    try {
        const list = await AppDataSource.query(
            `SELECT
                    id,
                    name,
                    weight,
                    amount,
                    made_in,
                    price,
                    image
            FROM products
            ORDER BY id LIMIT ${limit} OFFSET ${offset}
            `);
        return list;
    } catch (err) {
        throw new AppError('INVALID_DATA_INPUT', 500)
    };
};

const loadProductDetail = async (productId) => {
    try {
        const detail = await AppDataSource.query(
            `SELECT
                    id,
                    name,
                    weight,
                    amount,
                    made_in,
                    image,
                    price
            FROM products
            WHERE products.id="${productId}"
            ;
            `);
        return detail;
    } catch (err) {
        throw new AppError('INVALID_DATA_INPUT', 500)
    };
};

const getProductsByAsc = async (offset, limit) => {
    try {
        const list = await AppDataSource.query(
            `SELECT
                    id,
                    name,
                    weight,
                    amount,
                    made_in,
                    price,
                    image
            FROM products
            ORDER BY price ASC LIMIT ${limit} OFFSET ${offset}
            `);
        return list;
    } catch (err) {
        throw new AppError('INVALID_DATA_INPUT', 500)
    };
};

const getProductsByDesc = async (offset, limit) => {
    try {
        const list = await AppDataSource.query(
            `SELECT 
                    id,
                    name,
                    weight,
                    amount,
                    made_in,
                    price,
                    image
            FROM products
            ORDER BY price DESC LIMIT ${limit} OFFSET ${offset}
            `);
        return list;
    } catch (err) {
        throw new AppError('INVALID_DATA_INPUT', 500)
    };
};

const getProductsByHighCate = async (prod, offset, limit) => {
    try {
        const list = await AppDataSource.query(
            `SELECT
                    name,
                    weight,
                    amount,
                    made_in,
                    price,
                    image
            FROM products
            INNER JOIN low_category
                ON products.low_category_id = low_category.id
            INNER JOIN middle_category
                ON low_category.middle_category_id = middle_category.id
            INNER JOIN high_category
                ON middle_category.high_category_id = high_category.id
            WHERE high_category.id = ${prod}
            ORDER BY products.id ASC LIMIT ${limit} OFFSET ${offset};
            `)
        return list;
    } catch (err) {
        throw new AppError('INVALID_DATA_INPUT', 500)
    };
};

const getProductsByMiddleCate = async (prod, offset, limit) => {
    try {
        const list = await AppDataSource.query(
            `SELECT
                    name,
                    weight,
                    amount,
                    made_in,
                    price,
                    image                    
            FROM products
            INNER JOIN low_category
                ON products.low_category_id = low_category.id
            INNER JOIN middle_category
                ON low_category.middle_category_id = middle_category.id
            WHERE middle_category.id = ${prod}
            ORDER BY products.id ASC LIMIT ${limit} OFFSET ${offset};
            `)
        return list;
    } catch (err) {
        throw new AppError('INVALID_DATA_INPUT', 500)
    };
};

const getProductsByLowCate = async (prod, offset, limit) => {
    try {
        const list = await AppDataSource.query(
            `SELECT
                    name,
                    weight,
                    amount,
                    made_in,
                    price,
                    image                    
            FROM products
            INNER JOIN low_category
                ON products.low_category_id = low_category.id
            WHERE low_category_id = ${prod}
            ORDER BY products.id ASC LIMIT ${limit} OFFSET ${offset};
            `)
        return list;
    } catch (err) {
        throw new AppError('INVALID_DATA_INPUT', 500)
    };
};

const addProductAmount = async (userId, productId, amount) => {
    try {
        return await AppDataSource.query(
            `INSERT INTO cart(
                user_id,
                product_id,
                amount
            ) VALUES (?, ?, ?);
            `, [userId, productId, amount]);
    } catch (err) {
        throw new AppError('INVALID_DATA_INPUT', 500)
    };
};

const checkProductAmount = async (userId, productId) => {
    try {
        const [result] = await AppDataSource.query(
            `SELECT
                    amount
            FROM cart
            WHERE product_id = ${productId}
            AND user_id = ${userId};
            `)
        return result;
    } catch (err) {
        throw new AppError('INVALID_DATA_INPUT', 500)
    };
};

module.exports = {
    getProductById,
    loadProductList,
    loadProductDetail,
    getProductsByAsc,
    getProductsByDesc,
    getProductsByHighCate,
    getProductsByMiddleCate,
    getProductsByLowCate,
    addProductAmount,
    checkProductAmount
}
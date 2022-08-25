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

const deleteReview = async (reviewId) => {
    try {
        const deleteRows = (await AppDataSource.query(`
            DELETE FROM reviews
            WHERE reviews.id = ${reviewId}`
        )).affectedRows;
        if (deleteRows !== 0 && deleteRows !== 1) throw new appError('UNEXPECTED_NUMBER_OF_RECORDS_DELETED', 500)

    } catch (err) {
        throw new appError('INVALID_DATA_INPUT', 500)
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
        throw new appError('INVALID_DATA_INPUT', 500)
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
const loadProductList = async (start, limit) => {
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
            ORDER BY id LIMIT ${limit} OFFSET ${start}
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

const getProductsByAsc = async (start, limit) => {
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
            ORDER BY price ASC LIMIT ${limit} OFFSET ${start}
            `);
        return list;
    } catch (err) {
        throw new AppError('INVALID_DATA_INPUT', 500)
    };
};

const getProductsByDesc = async (start, limit) => {
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
            ORDER BY price DESC LIMIT ${limit} OFFSET ${start}
            `);
        return list;
    } catch (err) {
        throw new AppError('INVALID_DATA_INPUT', 500)
    };
};

const getProductsByHighCate = async (prod, start, limit) => {
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
            ORDER BY products.id ASC LIMIT ${limit} OFFSET ${start};
            `)
        return list;
    } catch (err) {
        throw new AppError('INVALID_DATA_INPUT', 500)
    };
};

const getProductsByMiddleCate = async (prod, start, limit) => {
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
            ORDER BY products.id ASC LIMIT ${limit} OFFSET ${start};
            `)
        return list;
    } catch (err) {
        throw new AppError('INVALID_DATA_INPUT', 500)
    };
};

const getProductsByLowCate = async (prod, start, limit) => {
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
            ORDER BY products.id ASC LIMIT ${limit} OFFSET ${start};
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
    createReview,
    getProductById,
    getReviews,
    deleteReview,
    getReviewById,
    updateReview,
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
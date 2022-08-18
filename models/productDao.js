const { AppDataSource } = require("../models/dataSource");

const loadProductList = async() => {
    try{
        const list = await AppDataSource.query(
            `SELECT
                    name,
                    weight,
                    amount,
                    made_in
            FROM product;
            `);
        return list;
    }catch(err){
        const error = new Error('NO_DATA');
        error.statusCode = 500;
        throw error;
    };
};

const loadProductDetail = async(productName) => {
    try{
        const detail = await AppDataSource.query(
            `SELECT
                    id,
                    name,
                    weight,
                    amount,
                    made_in
            FROM product
            WHERE name="${productName}";
            `);
            return detail;
        }catch(err){
            const error = new Error('INVALID_DATA_INPUT');
            error.statusCode = 500;
            throw error;
        };
};

module.exports = {
    loadProductList,
    loadProductDetail
};
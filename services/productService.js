const productDao = require("../models/productDao");

const loadProductList = async() => {
    const loadProductList = await productDao.loadProductList();
    return loadProductList;
};

const productDetail = async(productName) => {
    const productDetail = await productDao.loadProductDetail(productName);
    return productDetail;
};

module.exports = {
    loadProductList,
    productDetail
}
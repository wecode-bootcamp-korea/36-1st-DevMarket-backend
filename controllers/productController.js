const productService = require("../services/productService");

const loadProductList = async (req, res) => {
    try{
        const list = await productService.loadProductList();
        return res.status(201).json({message : list});
    } catch(err){
        return res.status(err.statusCode || 500).json({message : err.message})
    };
};

const productDetail = async(req, res) => {
    try{
        const { productName } = req.params;
        if(!productName){
            return res.status(400).json({message : "KEY_ERROR"});
        };
        const product = await productService.productDetail(productName);
        return res.status(200).json({"Product_Detail" : product});
    } catch(err){
        return res.status(err.statusCode || 500).json({message : err.message})
    };
};

module.exports = {
    loadProductList,
    productDetail
}
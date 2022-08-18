const cartService = require("../services/cartService");

const cartList = async(req, res) => {
    try{
        const {userId} = req.body;
        if(!userId){
            return res.status(400).json({message : "KEY_ERROR"});
        };

        const list = await cartService.cartList(userId);
        return res.status(201).json({"Cart_List" : list});
    } catch(err) {
        console.log(err);
        return res.status(err.statusCode || 500).json({ message : err.message});
    };
};

const addProduct = async(req, res) => {
    try{
        const {userId, productId, amount} = req.body;
        if(!userId || !productId ||!amount){
            return res.status(400).json({message : "KEY_ERROR"});
        };

        await cartService.addProduct(userId, productId, amount);
        return res.status(201).json({message : "PRODUCT_ADDED"})
    } catch(err) {
        console.log(err);
        return res.status(err.statusCode || 500).json({ message : err.message});
    };
};

const deleteCart = async(req, res) => {
    try{
        const {userId} = req.body;
        if(!userId){
            return res.status(400).json({message : "KEY_ERROR"});
        };

        await cartService.deleteCart(userId);
        return res.status(200).json({message : "CART_DELETED"})
    } catch(err) {
        console.log(err);
        return res.status(err.statusCode || 500).json({ message : err.message});
    };
};

const updateAmount = async(req, res) => {
    try{
        const {userId, productId, amount} = req.body;
        if(!userId || !productId ||!amount){
            return res.status(400).json({message : "KEY_ERROR"});
        };

        await cartService.updateAmount(userId, productId, amount);
        return res.status(201).json({message : "AMOUNT_UPDATED"});
    } catch(err) {
        console.log(err);
        return res.status(err.statusCode || 500).json({ message : err.message});
    };
};

module.exports = {
    cartList,
    addProduct,
    deleteCart,
    updateAmount
}
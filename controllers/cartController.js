const cartService = require("../services/cartService");

const cartList = async(req, res) => {
    try{
        const {userId} = req.body;
        if(!userId){
            return res.status(400).json({message : "KEY_ERROR"});
        };

        const list = await cartService.cartList(userId);
        return res.status(200).json(list);
    } catch(err) {
        console.log(err);
        return res.status(err.statusCode || 500).json({ message : err.message});
    };
};

module.exports = {
    cartList
}
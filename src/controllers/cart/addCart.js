const { StatusCodes } = require('http-status-codes');
const { handleErrorResponse } = require('../../services/commonService');
const ResponseMessage = require('../../utils/ResponseMessage.json');
const Cart = require('../../models/cart');
const Product = require('../../models/product');


const addCart = async(req,res)=>{
    try {
        const userId = req.user._id
        const { productId,quantity,price } = req.body
        const product = await Product.findById(productId)
        if(!product){
            return res.status(409).json({ status: StatusCodes.OK, message: ResponseMessage.PRODUCT_NOT_FOUND})
        }
        
        const newCart = new Cart({
            userId: userId,
            products:[{ productId,quantity,price: price*quantity}],
            totalAmount: price*quantity
        }) 
        await newCart.save();

        return res.status(200).json({
            status: StatusCodes.OK,
            message: ResponseMessage.NEW_CART,
            data: newCart
        })
    } catch (error) {
        return handleErrorResponse(res,error)
    }
}

module.exports = addCart;
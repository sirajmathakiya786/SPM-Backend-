const { StatusCodes } = require("http-status-codes");
const ProductFavourite  = require("../../models/productFavourite");
const { handleErrorResponse } = require("../../services/commonService");
const ResponseMessage = require('../../utils/ResponseMessage.json');

const productFavourite = async(req,res)=>{
    try {
        const userId = req.user._id
        const { productId,isLike } = req.body
        const likeUnLikeData = await ProductFavourite.findOneAndUpdate(
            { userId, productId },
            { isLike },
            { new: true, upsert: true }
        )
        let message = isLike ? "Product Like": "Product Dislike";
        return res.status(200).json({
            status: StatusCodes.OK,
            message: message,
            data: likeUnLikeData
        })
    } catch (error) {
        return handleErrorResponse(res,error)
    }
}


module.exports = productFavourite;
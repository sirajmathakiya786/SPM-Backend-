const { StatusCodes } = require('http-status-codes');
const Product = require('../../models/product');
const { handleErrorResponse } = require('../../services/commonService');
const ResponseMessage = require('../../utils/ResponseMessage.json');
const fs = require('fs');
const path = require('path');

const deleteProduct = async(req,res)=>{
    try {
        const productId = req.params.id
        const findById = await Product.findById(productId);
        const imagePath = path.join(__dirname, 'public/uploads/productImage', findById.productImage)
        await fs.unlink(imagePath)
        const deleteData = await Product.findByIdAndUpdate(
            { _id: productId },
            { isDeleted: true },
            { new: true }    
        )

        return res.status(200).json({
            status: StatusCodes.OK,
            message: ResponseMessage.PRODUCT_DELETED,
            data: deleteData
        })
    } catch (error) {
        return handleErrorResponse(res,error)
    }
}

module.exports = deleteProduct;
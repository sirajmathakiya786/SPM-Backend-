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
        
        const imageFilename = findById.productImage        
       
        const deleteData = await Product.findByIdAndUpdate(
            { _id: productId },
            { isDeleted: true },
            { new: true }    
        )
           
        if(imageFilename){
            const imagePath = path.resolve(process.env.productImageURL, imageFilename);
            if(fs.existsSync(imagePath)){
                fs.unlinkSync(imagePath)
            }
        }
        return res.status(200).json({
            status: StatusCodes.OK,
            message: ResponseMessage.PRODUCT_DELETED,
            data: deleteData
        })
    } catch (error) {
        console.log(error);
        return handleErrorResponse(res,error)
    }
}

module.exports = deleteProduct;
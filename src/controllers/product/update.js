const { StatusCodes } = require('http-status-codes');
const Product = require('../../models/product');
const { handleErrorResponse } = require('../../services/commonService');
const ResponseMessage = require('../../utils/ResponseMessage.json');
const fs = require("fs");

const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const { categoryId, subCategoryId, price, stock, description, productName } = req.body;
        const productPicPath = req?.file?.filename;

        const isProductIdExists = await Product.findOne({ _id: productId });

        if (!isProductIdExists) {
            return res.status(409).json({ status: StatusCodes.CONFLICT, message: ResponseMessage.PRODUCT_NOT_FOUND });
        } else {
            const productImageUrl = isProductIdExists.productImage;

            if (productImageUrl && productPicPath) {
                // If a new image is provided, delete the old image
                fs.unlink(process.env.productImageURL + productImageUrl, (err) => {
                    if (err) {
                        console.log("Error while deleting old image:", err);
                    } else {
                        console.log("Old image deleted successfully");
                    }
                });
            }
        }

        const updateProductData = {
            categoryId,
            subCategoryId,
            price,
            stock,
            description,
            productName,
        };
        
        // Only update the productImage field if a new image is provided
        if (productPicPath) {
            updateProductData.productImage = productPicPath;
        }

        const updateData = await Product.findByIdAndUpdate(
            { _id: productId },
            { $set: updateProductData },
            { new: true }
        );
        
        return res.status(200).json({
            status: StatusCodes.OK,
            message: ResponseMessage.UPDATE_PRODUCT,
            data: updateData,
        });
    } catch (error) {
        return handleErrorResponse(res, error);
    }
};

module.exports = updateProduct;

// const { StatusCodes } = require('http-status-codes');
// const Product = require('../../models/product');
// const { handleErrorResponse } = require('../../services/commonService');
// const ResponseMessage = require('../../utils/ResponseMessage.json');
// const fs = require("fs");

// const updateProduct = async(req,res)=>{
//     try {
//         const productId = req.params.id
//         const { categoryId,subCategoryId,price,stock,description,productName } = req.body;
//         const productPicPath = req?.file?.filename;
//         const isProductIdExists = await Product.findOne({ _id: productId })
//         if(!isProductIdExists){
//             return res.status(409).json({ status: StatusCodes.CONFLICT, message: ResponseMessage.PRODUCT_NOT_FOUND})
//         }else{
//             const productImageUrl = isProductIdExists.productImage
//             if(productImageUrl){
//                 fs.unlink(process.env.productImageURL + productImageUrl, (err)=>{
//                     if(err){
//                         console.log("Error while deleting old image:", err);
//                     }else{
//                         console.log("Old image deleted successfully");
//                     }
//                 })
//             }
//         }
//         const updateProductData = {
//             categoryId,subCategoryId,price,stock,description,productName,productImage:productPicPath
//         }
//         const updateData = await Product.findByIdAndUpdate(
//             { _id: productId },
//             { $set: updateProductData },
//             { new: true }
//         )

//         return res.status(200).json({
//             status: StatusCodes.OK,
//             message: ResponseMessage.UPDATE_PRODUCT,
//             data: updateData
//         })
//     } catch (error) {
//         return handleErrorResponse(res,error)        
//     }
// }

// module.exports = updateProduct;
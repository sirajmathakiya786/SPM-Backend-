const { StatusCodes } = require('http-status-codes');
const Product = require('../../models/product');
const { handleErrorResponse } = require('../../services/commonService');
const ResponseMessage = require('../../utils/ResponseMessage.json');


const createProduct = async(req,res)=>{
    try {
        const userId = req.user._id
        const { categoryId,subCategoryId,price,stock,description,productName } = req.body;
        const isExistsProduct = await Product.findOne({ productName })
        if(isExistsProduct){
            return res.status(409).json({ status: StatusCodes.CONFLICT, message: ResponseMessage.PRODUCT_EXISTS})
        }
        const addProductData = new Product({
            userId: userId,
            categoryId,
            subCategoryId,
            price,
            stock,
            description,
            productName,
            productImage: req.file.originalname
        })
        await addProductData.save();
        return res.status(201).json({
            status: StatusCodes.CREATED,
            message: ResponseMessage.PRODUCT_CREATED,
            data: addProductData
        })
    } catch (error) {
        return handleErrorResponse(res,error)
    }
}

module.exports = createProduct
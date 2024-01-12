const { StatusCodes } = require('http-status-codes');
const Product = require('../../models/product');
const { handleErrorResponse } = require('../../services/commonService');
const ResponseMessage = require('../../utils/ResponseMessage.json');


const listProduct = async(req,res)=>{
    try {
        const getproductData = await Product.find({ isDeleted: false})
        .populate('userId', 'name')
        .populate('categoryId', 'name')
        .populate('subCategoryId', 'name')
        
        const responseData = getproductData.map(product=>({
            _id: product._id,
            userId:{
                _id: product.userId._id,
                name: product.userId.name
            },
            categoryId:{
                _id: product._id,
                name: product.categoryId.name
            },
            subCategoryId:{
                _id: product._id,
                name: product.subCategoryId.name
            },
            productName: product.productName,
            price: product.price,
            stock: product.stock,
            description: product.description,
            productImage: process.env.BASE_URL + process.env.productImageURL + encodeURIComponent(product.productImage),
            isDeleted: product.isDeleted,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt
        }))

        return res.status(200).json({
            status: StatusCodes.OK,
            message: ResponseMessage.PRODUCT_FETCH,
            data: responseData
        })
    } catch (error) {
        handleErrorResponse
    }
}

module.exports = listProduct;
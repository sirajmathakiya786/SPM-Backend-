const { StatusCodes } = require('http-status-codes');
const Category = require('../../models/category');
const { handleErrorResponse } = require('../../services/commonService');
const ResponseMessage = require('../../utils/ResponseMessage.json');

const getCategories = async(req,res)=>{
    try {
        const getCategoryData = await Category.find({ isDeleted: false }).select('name')
        return res.status(200).json({
            status: StatusCodes.OK,
            message: ResponseMessage.GET_CATEGORIES,
            data:getCategoryData
        })
    } catch (error) {
        return handleErrorResponse(res,error)
    }
}

module.exports = getCategories
const { StatusCodes } = require('http-status-codes');
const SubCategory = require('../../models/subcategory');
const { handleErrorResponse } = require('../../services/commonService');
const ResponseMessage = require('../../utils/ResponseMessage.json');


const getAllSubCategory = async(req,res)=>{
    try {
        const getSubcategoriesData = await SubCategory.find({
            isDeleted: false
        }).select('name')

        return res.status(200).json({
            status: StatusCodes.OK,
            message: ResponseMessage.SUB_CATEGORY_GET,
            data:getSubcategoriesData
        })
    } catch (error) {
        return handleErrorResponse(res,error)
    }
}

module.exports = getAllSubCategory
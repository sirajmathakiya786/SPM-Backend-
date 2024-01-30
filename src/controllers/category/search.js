const { handleErrorResponse } = require("../../services/commonService");
const Category = require("../../models/category");
const { StatusCodes } = require("http-status-codes");
const ResponseMessage = require('../../utils/ResponseMessage.json');

const searchCategory = async(req,res)=>{
    try {
        const { searchParams } = req.body;
        const regex = new RegExp(searchParams, 'i');
        const category = await Category.find({
            isDeleted: false,
            $or:[
                {name: {$regex: regex}}
            ]
        })

        if(category.length === 0){
            return res.status(404).json({
                status: StatusCodes.NOT_FOUND,
                message: ResponseMessage.SEARCH_NOT_FOUND
            })
        }

        return res.status(200).json({
            status: StatusCodes.OK,
            message: ResponseMessage.SEARCH_DATA_FOUND,
            data:category
        })
    } catch (error) {
        return handleErrorResponse(res,error)
    }
}

module.exports = searchCategory;
const { StatusCodes } = require("http-status-codes");
const Category = require("../../models/category")
const { handleErrorResponse } = require("../../services/commonService")
const ResponseMessage = require('../../utils/ResponseMessage.json');
const fs = require('fs');
const path = require('path');

const deleteCategory = async(req,res)=>{
    try {
        const userId = req.params.id
        const findId = await Category.findById(userId);
        if(!findId){
            return res.status(409).json({ status: StatusCodes.CONFLICT, message: ResponseMessage.CATEGORY_NOT_FOUND})
        }

        const imageFilename = findId.image;
        
        const deleteCategoryData = await Category.findByIdAndUpdate(userId,
            { isDeleted: true },
            { new: true }
        )

        if (imageFilename) {
            const imagePath = path.resolve('public/uploads/categoryImage/', imageFilename);
            
            // Check if the file exists before attempting to delete
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }

        return res.status(200).json({ 
            status: StatusCodes.OK, 
            message: ResponseMessage.DELETE_CATEGORY, 
            data:deleteCategoryData 
        })
    } catch (error) {
        return handleErrorResponse
    }
}

module.exports = deleteCategory;
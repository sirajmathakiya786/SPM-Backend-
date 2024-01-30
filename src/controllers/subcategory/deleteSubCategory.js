const { StatusCodes } = require("http-status-codes");
const SubCategory = require("../../models/subcategory");
const { handleErrorResponse } = require("../../services/commonService");
const ResponseMessage = require('../../utils/ResponseMessage.json');
const path = require('path');
const fs = require('fs')

const deleteSubCategory = async(req,res)=>{
    try {
      const userId = req.params.id
      const findId = await SubCategory.findById(userId)
      
      if(!findId){
        return res.status(409).json({ status: StatusCodes.CONFLICT, message: ResponseMessage.SUB_CATEGORY_NOT_FOUND})
      }
      const imageFileName = findId.image;

      const deleteSubCategoryData = await SubCategory.findByIdAndUpdate(
        userId,
        { isDeleted: true },
        { new: true }
      )

      if(imageFileName){
        const imagePath = path.resolve(process.env.subCategoryImageURL, imageFileName);
        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
        }
      }

      return res.status(200).json({
        status: StatusCodes.OK,
        message: ResponseMessage.DELETED_SUB_CATEGORY,
        data: deleteSubCategoryData
      })
    } catch (error) {
        return handleErrorResponse(res,error)
    }
}

module.exports = deleteSubCategory;

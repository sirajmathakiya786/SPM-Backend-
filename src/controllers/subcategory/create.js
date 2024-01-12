const { StatusCodes } = require('http-status-codes');
const SubCategory = require('../../models/subcategory');
const { handleErrorResponse } = require('../../services/commonService');
const ResponseMessage = require('../../utils/ResponseMessage.json');

const addSubCategory = async (req, res) => {
    try {
        const { categoryId,subCategoryName } = req.body;
        const isSubcategoryExists = await SubCategory.findOne({ name: subCategoryName })
        if (isSubcategoryExists) {
            return res.status(409).json({ status: StatusCodes.CONFLICT, message: ResponseMessage.SUBCATEGORY_EXISTS })
        }

        const addData = new SubCategory({
            categoryId,name:subCategoryName, image: req.file.originalname
        })
        await addData.save();
        return res.status(201).json({
            status: StatusCodes.CREATED,
            message: ResponseMessage.SUBCATEGORY_ADDED,
            data: addData
        })
    } catch (error) {
        return handleErrorResponse(res, error)
    }
}

module.exports = addSubCategory;
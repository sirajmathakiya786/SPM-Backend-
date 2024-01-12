const { StatusCodes } = require("http-status-codes");
const SubCategory = require("../../models/subcategory");
const { handleErrorResponse } = require("../../services/commonService")
const ResponseMessage = require('../../utils/ResponseMessage.json');

const getSubCategory = async (req, res) => {
    try {
        const getData = await SubCategory.find({ isDeleted: false })
            .populate('categoryId', 'name')
            .sort({ createdAt: -1 })
            const responseData = getData.map(subCategory => ({
                _id: subCategory._id,
                name: subCategory.name,
                // imageUrl: process.env.BASE_URL + process.env.subCategoryImageURL + subCategory.image, 
                imageUrl: process.env.BASE_URL + process.env.subCategoryImageURL + encodeURIComponent(subCategory.image),
                isDeleted: subCategory.isDeleted,
                categoryId: {
                  _id: subCategory.categoryId._id,
                  name: subCategory.categoryId.name
                },
                createdAt: subCategory.createdAt,
                updatedAt: subCategory.updatedAt
              }));
              
        return res.status(200).json({
            status: StatusCodes.OK,
            message: ResponseMessage.SUBCATEGORY_GET,
            data: responseData
        })
    } catch (error) {
        return handleErrorResponse(req, error)
    }
}

module.exports = getSubCategory;
const { StatusCodes } = require('http-status-codes');
const Category = require('../../models/category');
const { handleErrorResponse } = require('../../services/commonService');
const ResponseMessage = require('../../utils/ResponseMessage.json');

const listCategory = async(req,res)=>{
    try {
        const getData = await Category.find({
            isDeleted: false
        }).sort({createdAt: -1})
        const categoryImageURL = process.env.BASE_URL + process.env.categoryImageURL;
        const modifiedData = getData.map(category => {
        const encodedImageName = encodeURIComponent(category.image);
            return {
                ...category.toObject(),
                image: categoryImageURL + encodedImageName
            };
        });

        return res.status(200).json({ 
            status: StatusCodes.OK,
            message: ResponseMessage.CATEGORY_GET,
            data: modifiedData
        })
    } catch (error) {
        return handleErrorResponse(res,error)
    }
}

module.exports = listCategory;
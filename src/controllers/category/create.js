const { StatusCodes } = require('http-status-codes');
const Category = require('../../models/category');
const { handleErrorResponse } = require('../../utils/ResponseMessage.json');
const ResponseMessage = require('../../utils/ResponseMessage.json');

const create = async(req,res)=>{
    try {
        const { categoryName } = req.body
        const isCategoryExists = await Category.findOne({ name: categoryName });
        if(isCategoryExists){
            return res.status(409).json({ 
                status: StatusCodes.CONFLICT, 
                message: ResponseMessage.CATEGORY_EXISTS
            })
        }
        const addCategoryData = new Category({
            name: categoryName,
            image: req.file.originalname
        })
        await addCategoryData.save();
        return res.status(201).json({ 
            status: StatusCodes.CREATED, 
            message: ResponseMessage.CATEGORY_ADDED, 
            data:addCategoryData
        })
    } catch (error) {
        return handleErrorResponse(res,error)
    }
}

module.exports = create;
const { StatusCodes } = require('http-status-codes');
const Category = require('../../models/category');
const Product = require('../../models/product');
const SubCategory = require('../../models/subcategory');
const User = require('../../models/users');
const { handleErrorResponse } = require('../../utils/ResponseMessage.json');
const ResponseMessage = require('../../utils/ResponseMessage.json');

const getCount = async(req,res)=>{
    try {
        const userCount = await User.countDocuments({ isDeleted: false });
        const categoryCount = await Category.countDocuments({ isDeleted: false});
        const subCategoryCount = await SubCategory.countDocuments({ isDeleted: false });
        const productCount = await Product.countDocuments({ isDeleted: false });

        return res.status(200).json({ 
            status: StatusCodes.OK,
            message: ResponseMessage.DASHBOARD_COUNT,
            data:{
                userCount,
                categoryCount,
                subCategoryCount,
                productCount
            }
        })
    } catch (error) {
        return handleErrorResponse(res,error)
    }
}


module.exports = getCount;
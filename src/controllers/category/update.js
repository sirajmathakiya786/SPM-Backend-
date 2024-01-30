    const { StatusCodes } = require('http-status-codes');
    const Category = require('../../models/category');
    const  { handleErrorResponse } = require('../../services/commonService');
    const ResponseMessage = require('../../utils/ResponseMessage.json');
    const fs = require("fs");

    const updateCategory = async(req,res)=>{
        try {
            const userId = req.params.id
            const { name } = req.body;
            const categoryImagePath = req?.file?.filename;
            const categoryId = await Category.findById( userId)
            if(!categoryId){
                return res.status(409).json({ status: StatusCodes.CONFLICT, message: ResponseMessage.CATEGORY_NOT_FOUND })
            }else{
                const categoryImageURL = categoryId.image
               
                    // New file is provided, delete the old image
                    if (categoryImageURL) {
                        fs.unlink(process.env.categoryImageURL + categoryImageURL, (err) => {
                            if (err) {
                                console.log('Error while deleting old image:', err);
                            } else {
                                console.log('Old image deleted successfully');
                            }
                        });
                    }
               
            }
            const updateCategoryData = {
                name:name,
                image: categoryImagePath
            }
            const categoryUpdateData = await Category.findByIdAndUpdate(userId,
                { $set: updateCategoryData },
                { new: true }
            )

            return res.status(200).json({ 
                status: StatusCodes.OK, 
                message: ResponseMessage.CATEGORY_UPDATE, 
                data:categoryUpdateData 
            })
        } catch (error) {
            console.log(error);
            return handleErrorResponse(res,error)
        }
    }

    module.exports = updateCategory;
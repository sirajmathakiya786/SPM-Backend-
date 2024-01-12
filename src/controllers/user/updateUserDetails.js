const { StatusCodes } = require("http-status-codes");
const User = require("../../models/users");
const { handleErrorResponse } = require("../../services/commonService")
const ResponseMessage = require('../../utils/ResponseMessage.json');
const fs = require('fs');

const updateUserDetails = async(req,res)=>{
    try {
        const userId = req.params.id
        const { name,email,phoneNumber } = req.body;
        const userProfilePicPath = req?.file?.filename;
        const findById = await User.findOne({ _id: userId });
        if(!findById){
            return res.status(400).json({ status: StatusCodes.BAD_REQUEST, message: ResponseMessage.USER_NOT_FOUND })
        }else{
            const profileImageUrl = findById.profileImage;
            // console.log(profileImageUrl,"profileImageUrl",findById)
            if (profileImageUrl) {
                fs.unlink(process.env.profileImageURL + profileImageUrl, (err) => {
                if (err) {
                    console.log("Error while deleting old image:", err);
                } else {
                    console.log("Old image deleted successfully");
                }
                });
            }
        }
        const updateUserData = {
            name,email,phoneNumber,profileImage:userProfilePicPath
        }
        const updateData = await User.findByIdAndUpdate(userId,
            { $set: updateUserData },
            { new: true }    
        )

        return res.status(200).json({
            status: StatusCodes.OK,
            message: ResponseMessage.USER_DATA_UPDATED,
            data: updateData
        })

    } catch (error) {
        return handleErrorResponse(res,error)
    }
}

module.exports = updateUserDetails;
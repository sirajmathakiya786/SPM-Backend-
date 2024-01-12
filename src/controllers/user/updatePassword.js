const { StatusCodes } = require("http-status-codes");
const User = require("../../models/users")
const { handleErrorResponse, passwordEncypt } = require("../../services/commonService")
const ResponseMessage = require('../../utils/ResponseMessage.json');
const bcrypt = require('bcrypt');

const updatePassword = async(req,res)=>{
    try {
        const userId = req.user
        const { oldPassword, newPassword } = req.body;
        const user = await User.findOne({ _id: userId._id })
        const checkOldPassword = await bcrypt.compare(oldPassword, user.password);
        if(!checkOldPassword){
            return res.status(400).json({
                status: StatusCodes.BAD_REQUEST,
                message: ResponseMessage.USER_OLD_PASSWORD
            })
        }
        if(newPassword === ''){
            return res.status(400).json({
                status: StatusCodes.BAD_REQUEST,
                message: "New Password is required"
            })
        }
        const checkNewPassword = await bcrypt.compare(newPassword, user.password);
        if(checkNewPassword){
            return res.status(400).json({
                status: StatusCodes.BAD_REQUEST,
                message: ResponseMessage.USER_MATCH_PASSWORD
            })
        }
        const passwordHash = await passwordEncypt(newPassword, user.password);
        const updatePasswordData = await User.findByIdAndUpdate(
            { _id: userId._id },
            { $set: { password:passwordHash }},
            { new: true }
        )

        return res.status(200).json({
            status: StatusCodes.OK,
            message: ResponseMessage.USER_PASSWORD_UPDATED,
            data: updatePasswordData
        })
    } catch (error) {
        return handleErrorResponse(res,error)
    }
}

module.exports = updatePassword;
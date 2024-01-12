const { StatusCodes } = require("http-status-codes")
const { handleErrorResponse } = require("../../services/commonService")
const ResponseMessage = require('../../utils/ResponseMessage.json');
const User = require("../../models/users");

const userList = async(req,res)=>{
    try {
        const getUserData = await User.find({ isDeleted: false })
        return res.status(200).json({
            status: StatusCodes.OK,
            message: ResponseMessage.USER_GET_DATA,
            data: getUserData
        })
    } catch (error) {
        return handleErrorResponse(res,error)
    }
}

module.exports = userList;
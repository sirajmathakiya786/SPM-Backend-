const { StatusCodes } = require("http-status-codes")
const User = require("../../models/users")
const { handleErrorResponse } = require("../../services/commonService")
const ResponseMessage = require('../../utils/ResponseMessage.json');

const deleteUser = async(req,res)=>{
    try {
        const userId = req.params.id
        const isUserIdExists = await User.findOne({ _id: userId })
        if(!isUserIdExists){
            return res.status(404).json({ status: StatusCodes.NOT_FOUND, message: ResponseMessage.USER_NOT_FOUND })
        }
        const deleteUserData = await User.findByIdAndUpdate(userId,
            { isDeleted: true },
            { new: true }
        )

        return res.status(200).json({ 
            status: StatusCodes.OK, 
            message: ResponseMessage.USER_DELETED, 
            data:deleteUserData 
        })
    } catch (error) {
        return handleErrorResponse(res,error)
    }
}


module.exports = deleteUser;
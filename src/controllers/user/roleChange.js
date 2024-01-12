const { StatusCodes } = require("http-status-codes");
const User = require("../../models/users")
const { handleErrorResponse } = require("../../services/commonService")
const ResponseMessage = require('../../utils/ResponseMessage.json');

const roleChange = async(req,res)=>{
    try {
        const userId = req.params.id
        const { role } = req.body;

        const changeRole = await User.findByIdAndUpdate(
            { _id:userId },
            { role },
            { new: true }
        )
        return res.status(200).json({
            status: StatusCodes.OK,
            message: ResponseMessage.USER_STATUS_CHANGED,
            data: changeRole 
        })
    } catch (error) {
        return handleErrorResponse(res,error)
    }
}

module.exports = roleChange;
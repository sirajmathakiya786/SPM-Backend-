const { StatusCodes } = require("http-status-codes");
const User = require("../../models/users");
const { handleErrorResponse } = require("../../services/commonService")
const ResponseMessage = require('../../utils/ResponseMessage.json');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = async(req,res)=>{
    try {
        const { email,password } = req.body;
        const user = await User.findOne({ email });
        if(!user){
            return res.status(409).json({ status: StatusCodes.CONFLICT, message: ResponseMessage.USER_EMAIL_NOT_FOUND})
        }
        if(!bcrypt.compareSync(password,user.password)){
            return res.status(502).json({ status: StatusCodes.BAD_GATEWAY, message: ResponseMessage.USER_INVALID_PASSWORD})
        }
        const token  = jwt.sign({ _id:user._id}, process.env.JWT_SECRET_KEY,{
            expiresIn: '11h'
        })

        return res.status(200).json({
            status: StatusCodes.OK,
            message: ResponseMessage.USER_LOGIN,
            user:{
                _id:user._id,
                name: user.name,
                email: user.email,
                phoneNumber: user.phoneNumber,
                role: user.role,    
                isActive: user.isActive,
                profileImage: process.env.BASE_URL + "/uploads/profileImage/" + user.profileImage
            },
            token
        })
    } catch (error) {
        return handleErrorResponse(res,error)
    }
}

module.exports = login;
const { StatusCodes } = require("http-status-codes");
const ResponseMessage = require('../../utils/ResponseMessage');
const  User = require("../../models/users");
const { passwordEncypt } = require('../../services/commonService');
const { handleErrorResponse } = require('../../services/commonService');

const register = async(req,res)=>{
    try {
        const { name,email,password,phoneNumber } = req.body;
        let passwordHash = await passwordEncypt(password)
        const isEmailExists = await User.findOne({ email });
        const isPhoneExists = await User.findOne({ phoneNumber: phoneNumber });

        if(isEmailExists && isPhoneExists){
            return res.status(409).json({
                status: StatusCodes.CONFLICT,
                message: ResponseMessage.BOTH_EXIST
            })
        }else if(isEmailExists){
            return res.status(409).json({ 
                status: StatusCodes.CONFLICT, 
                message: ResponseMessage.USER_EMAIL_EXISTS 
            });        
        }else if(isPhoneExists){
            return res.status(409).json({ 
                status: StatusCodes.CONFLICT, 
                message: ResponseMessage.USER_PHONE_EXISTS 
            });        
        }
        const registerUserData = new User({
            name,
            email,
            password:passwordHash,
            phoneNumber,
            profileImage: req.file ? req.file.originalname : ''
        })
        await registerUserData.save();
        return res.status(201).json({
            status: StatusCodes.CREATED,
            message: ResponseMessage.USER_CREATED,
            data: registerUserData
        })
    } catch (error) {
        return handleErrorResponse(res,error)
    }
}

module.exports =  register;
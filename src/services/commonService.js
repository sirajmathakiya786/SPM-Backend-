const bcrypt = require('bcrypt');
const { StatusCodes } = require("http-status-codes");
const ResponseMessage = require('../utils/ResponseMessage');

const passwordEncypt = async (password)=>{
    let salt = await bcrypt.genSalt(10);
        let passwordHash = await bcrypt.hash(password, salt);
        return passwordHash;

}

const validatePassword = (password)=>{
    const pattern = /^[^\s]{6,10}$/;
    return pattern.test(password);
}


const handleErrorResponse = (res,error)=>{
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        message: ResponseMessage.INTERNAL_SERVER_ERROR,
        data: error.message
    })
}
module.exports = { passwordEncypt,validatePassword,handleErrorResponse }
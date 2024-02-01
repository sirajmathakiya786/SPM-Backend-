const { handleErrorResponse } = require('../../services/commonService');
const ResponseMessage = require('../../utils/ResponseMessage.json');


const addCart = async(req,res)=>{
    try {
        console.log('cart');
    } catch (error) {
        return handleErrorResponse(res,error)
    }
}

module.exports = addCart;
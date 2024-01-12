const jwt = require('jsonwebtoken');
const User = require('../models/users');
const { StatusCodes } = require('http-status-codes');
const ResponseMessage = require('../utils/ResponseMessage.json');

const verifyJwtToken = async(req, res, next) => {
    const token = req.headers.auth;
    if (token == null) return res.sendStatus(401);
    
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const isUserExists = await User.findOne({
        _id: verified?._id,
    })

    if (verified && isUserExists) {
      req.user = verified;
      next();
    } else {
      return res.status(401).send({
        status: StatusCodes.UNAUTHORIZED,
        message: ResponseMessage.INVALID_TOKEN,
      });
    }
  } catch (error) {
    return res.status(401).send({
      status: StatusCodes.UNAUTHORIZED,
      message: ResponseMessage.TOKEN_EXPIRED,
    });
  }
}

const adminVerifyJwtToken = async(req, res, next) => {
    const token = req.headers.auth;
    if (token == null) return res.sendStatus(401);
    
    try {
      const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const isUserExists = await User.findOne({
          _id: verified?._id,
      })
      if (verified && isUserExists) {
        if(isUserExists.role === 'admin'){
          req.user = verified;
          next();
        }else{
          return res.status(403).send({
            status: StatusCodes.FORBIDDEN,
            message: ResponseMessage.ACCESS_DENIDED
          })
        }
        
      } else {
        return res.status(401).send({
          status: StatusCodes.UNAUTHORIZED,
          message: ResponseMessage.INVALID_TOKEN,
        });
      }
    } catch (error) {
      return res.status(401).send({
        status: StatusCodes.UNAUTHORIZED,
        message: ResponseMessage.TOKEN_EXPIRED,
      });
    }
}


const sellerVerifyJwtToken = async(req, res, next) => {
  const token = req.headers.auth;
  if (token == null) return res.sendStatus(401);
  
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const isUserExists = await User.findOne({
        _id: verified?._id,
    })
    if (verified && isUserExists) {
      if(isUserExists.role === 'seller'){
        req.user = verified;
        next();
      }else{
        return res.status(403).send({
          status: StatusCodes.FORBIDDEN,
          message: ResponseMessage.ACCESS_DENIDED
        })
      }
      
    } else {
      return res.status(401).send({
        status: StatusCodes.UNAUTHORIZED,
        message: ResponseMessage.INVALID_TOKEN,
      });
    }
  } catch (error) {
    return res.status(401).send({
      status: StatusCodes.UNAUTHORIZED,
      message: ResponseMessage.TOKEN_EXPIRED,
    });
  }
}


module.exports = { adminVerifyJwtToken,verifyJwtToken,sellerVerifyJwtToken }
  
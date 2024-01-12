const express = require('express');
const router = express.Router();
const { register,login,userList,deleteUser,roleChange,updatePassword,updateUserDetails } = require('../controllers/user');
const profileUpload = require('../middleware/profileUpload');
const { registerValidationRules,loginValidationRules } = require('../services/validation/userValidation');
const validateRequest = require('../middleware/bodyErrorSender');
const { adminVerifyJwtToken,verifyJwtToken } = require('../middleware/Auth');

router.post('/register', profileUpload,registerValidationRules,validateRequest,register);
router.post('/login', login); //loginValidationRules,validateRequest
router.get('/list',verifyJwtToken,userList);
router.put('/role-change/:id', adminVerifyJwtToken,roleChange);
router.delete('/delete/:id', adminVerifyJwtToken,deleteUser);
router.patch('/update', verifyJwtToken,updatePassword);
router.patch('/update-details/:id', profileUpload,adminVerifyJwtToken,updateUserDetails);

module.exports = router;
const express = require('express');
const router = express.Router();
const { adminVerifyJwtToken,verifyJwtToken,sellerVerifyJwtToken } = require('../middleware/Auth');
const { createProduct,listProduct,updateProduct,deleteProduct } = require('../controllers/product');
const productUpload = require('../middleware/productUpload');


router.post('/add', productUpload,sellerVerifyJwtToken,createProduct);
router.get('/list', verifyJwtToken,listProduct);
router.patch('/update/:id', productUpload,sellerVerifyJwtToken,updateProduct)
router.delete('/delete/:id', adminVerifyJwtToken,deleteProduct);


module.exports = router;
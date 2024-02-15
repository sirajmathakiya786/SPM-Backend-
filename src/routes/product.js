const express = require('express');
const router = express.Router();
const { adminVerifyJwtToken,verifyJwtToken,sellerVerifyJwtToken } = require('../middleware/Auth');
const { createProduct,listProduct,updateProduct,deleteProduct,productFavourite } = require('../controllers/product');
const productUpload = require('../middleware/productUpload');


router.post('/add', productUpload,sellerVerifyJwtToken,createProduct);
router.get('/list', verifyJwtToken,listProduct);
router.patch('/update/:id', productUpload,sellerVerifyJwtToken,updateProduct)
router.delete('/delete/:id', adminVerifyJwtToken,deleteProduct);
router.post('/product-like', verifyJwtToken,productFavourite);


module.exports = router;
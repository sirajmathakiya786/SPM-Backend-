const express = require('express');
const router = express.Router();
const { create,updateCategory,deleteCategory,listCategory,searchCategory,getCategories } = require('../controllers/category');
const { adminVerifyJwtToken,verifyJwtToken } = require('../middleware/Auth');
const categoryUpload = require('../middleware/categoryUpload');

router.post('/add', categoryUpload,adminVerifyJwtToken,create);
router.patch('/update/:id', categoryUpload,adminVerifyJwtToken,updateCategory);
router.delete('/delete/:id',adminVerifyJwtToken,deleteCategory);
router.get('/list', verifyJwtToken,listCategory);
router.post('/search', verifyJwtToken,searchCategory);
router.get('/get-categories', verifyJwtToken,getCategories);

module.exports = router;
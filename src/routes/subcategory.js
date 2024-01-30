const express = require('express');
const router = express.Router();
const { addSubCategory,getSubCategory,getAllSubCategory,deleteSubCategory } = require('../controllers/subcategory');
const { adminVerifyJwtToken,verifyJwtToken } = require('../middleware/Auth');
const subCategoryUpload = require('../middleware/subCategoryUpload');

router.post('/add', subCategoryUpload,adminVerifyJwtToken,addSubCategory);
router.get('/list', verifyJwtToken,getSubCategory);
router.get('/all-sub-categories', verifyJwtToken,getAllSubCategory);
router.delete('/delete-sub-category/:id', adminVerifyJwtToken,deleteSubCategory);

module.exports = router;
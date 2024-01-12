const express = require('express');
const router = express.Router();
const { addSubCategory,getSubCategory } = require('../controllers/subcategory');
const { adminVerifyJwtToken } = require('../middleware/Auth');
const subCategoryUpload = require('../middleware/subCategoryUpload');

router.post('/add', subCategoryUpload,addSubCategory);
router.get('/list', adminVerifyJwtToken,getSubCategory);


module.exports = router;
const express = require('express');
const router = express.Router();
const { create,update,deleteCategory,listCategory } = require('../controllers/category');
const { adminVerifyJwtToken } = require('../middleware/Auth');
const categoryUpload = require('../middleware/categoryUpload');

router.post('/add', categoryUpload,adminVerifyJwtToken,create);
router.patch('/update/:id', adminVerifyJwtToken,update);
router.delete('/delete/:id',adminVerifyJwtToken,deleteCategory);
router.get('/list', adminVerifyJwtToken,listCategory);


module.exports = router;
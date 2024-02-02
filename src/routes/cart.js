const express = require('express');
const router = express.Router();
const { addCart } = require('../controllers/cart');
const { verifyJwtToken } = require('../middleware/Auth');


router.post('/add', verifyJwtToken,addCart)


module.exports = router;
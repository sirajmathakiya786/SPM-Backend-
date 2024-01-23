const express = require('express');
const router = express.Router();
const { verifyJwtToken } = require('../middleware/Auth');
const { getCount } = require('../controllers/dashboard');


router.get('/get-count', getCount);



module.exports = router;
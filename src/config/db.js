const mongoose = require('mongoose');
const dotenv = require('dotenv');
require('dotenv').config();

const mongoURL = process.env.MONGO_URL

mongoose.connect(mongoURL).then(()=>{
    console.log('Connection has been established successfully');
}).catch((error)=>{
    console.log('Error established successfully', error);
})
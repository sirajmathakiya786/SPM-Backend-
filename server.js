const express = require("express");
const path = require("path")
const bodyParser = require("body-parser");
const http = require('http');
const cors = require("cors")
require('./src/config/db');
require('dotenv').config();

const PORT = process.env.PORT

const userRouter = require('./src/routes/user');
const categoryRouter = require('./src/routes/category');
const subCategoryRouter = require('./src/routes/subcategory');
const productRouter = require('./src/routes/product');
const dashboardRouter = require('./src/routes/dashboard');
const cartRouter = require('./src/routes/cart');

const app = express();
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine','hbs');
app.set('views',path.join(__dirname,'public'));
const baseImagePath = path.join(__dirname, 'public/uploads');
app.use('/public/uploads', express.static(baseImagePath));

app.use('/api/users', userRouter);
app.use('/api/category', categoryRouter);
app.use('/api/subcategory', subCategoryRouter);
app.use('/api/product', productRouter);
app.use('/api/dashboard', dashboardRouter);
app.use('/api/cart', cartRouter);

module.exports = 

app.listen(PORT, () =>{
    console.log(`Server Running on  ${PORT}`);
})
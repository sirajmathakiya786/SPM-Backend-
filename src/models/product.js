const mongoose  = require('mongoose');

const productSchema = mongoose.Schema(
    {
        userId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: true
        },
        categoryId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "category",
            required: true
        },
        subCategoryId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "subcategory",
            required: true
        },
        productName:{
            type: String,
            required: false
        },
        price:{
            type: Number,
            required: false
        },
        stock:{
            type: Number,
            required: false
        },
        description:{
            type: String,
            required: false
        },
        productImage:{
            type: String,
            required: false
        },
        isDeleted:{
            type: Boolean,
            default: false,
            required: false
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
);

const Product = mongoose.model("product", productSchema);
module.exports = Product;
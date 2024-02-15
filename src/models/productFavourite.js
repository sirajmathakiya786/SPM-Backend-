const mongoose = require('mongoose');


const productFavourite = mongoose.Schema(
    {
        userId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
        },
        productId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "product"
        },
        isLike:{
            type: Boolean,
        }
    },
    {
        versionKey: false,
        timestamps: true 
    }
)

const ProductFavourite = mongoose.model('productFavourite', productFavourite);
module.exports = ProductFavourite;
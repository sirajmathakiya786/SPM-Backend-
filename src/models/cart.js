const mongoose = require('mongoose');

const cartSchema = mongoose.Schema(
    {
        userId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true
        },
        products:[{
            productId:{
                type: mongoose.Schema.Types.ObjectId,
                ref: "product",
                required: true
            },
            quantity:{
                type: Number,
                required: true
            },
            price:{
                type: Number,
                required: true
            }
        }],
        totalAmount:{
            type: Number,
            required: false
        },
    },
    {
        versionKey: false,
        timestamps: true 
    }
)

const Cart = mongoose.model('cart',cartSchema);
module.exports = Cart;
const mongoose = require('mongoose');

const categorySchema = mongoose.Schema(
    {
        name:{
            type: String,
            required: false
        },
        image:{
            type: String,
            required: false
        },
        isDeleted:{
            type: Boolean,
            default: false
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
);

const Category = mongoose.model('category', categorySchema);
module.exports = Category;
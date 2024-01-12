const mongoose  = require ('mongoose');

const subCategorySchema = mongoose.Schema(
    {
        categoryId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "category",
            required: true
        },
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
)

const SubCategory = mongoose.model('subcategory', subCategorySchema);
module.exports = SubCategory;
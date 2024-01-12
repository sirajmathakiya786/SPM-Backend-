const mongoose  = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: false
        },
        email:{
            type: String,
            required: false
        },
        password:{
            type: String,
            required: false
        },
        phoneNumber:{
            type: String,
            required: false
        },
        otp:{
            type: Number,
            allowNull: false
        },
        otpExpiresTime:{
            type: Date,
            required: false
        },
        profileImage:{
            type: String,
            required: false
        },
        isActive:{
            type: Boolean,
            default: false,
            required: false
        },
        role:{
            type: String,
            enum:['admin','seller','user'],
            default: 'user',
            required: true
        },
        isDeleted:{
            type: Boolean,
            default: false,
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
);

const User = new mongoose.model('users', userSchema);
module.exports = User;
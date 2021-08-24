const mongoose = require('mongoose')
const {Schema} = mongoose;

const userschema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is req']
        },
        email: {
            type: String,
            required: [true, 'Email is req'],
            match: [
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                'Email is not valid'
            ],
            unique: true
        },
        password: {
            type: String,
            required: [true, 'Password is req']
        },
        confirm_password: {
            type: String,
            required: [true, 'Confirm Password is req']
        },
        // register_otp: {
        //     type: Number
        // },
        // register_otp_expiry: {
        //     type: Number
        // },
        // is_account_active: {
        //     type: Boolean,
        //     required: true,
        //     default: false
        // },
        reset_password_token: {
            type: String
        },
        reset_password_token_expiry: {
            type: Number
        }
    }
);

const User = mongoose.model('User', userschema);

module.exports = User

userschema.virtual(
    'postsinfo',
    {
        ref: 'Post',
        localField: '_id',
        foreignField: 'user_id'
    }
)
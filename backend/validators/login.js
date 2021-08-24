const {body} = require('express-validator');
const User = require('../models/user')
const bcrypt = require('bcrypt')

//register
const validationforregister = () => {
    return [
        body('name')
            .notEmpty().withMessage('Name is req'),

        body('email')
            .notEmpty().withMessage('Email is req').bail()
            .isEmail().withMessage('Email is not valid').bail()
            .custom(
                async (value, {req}) => {
                    if (
                        await User.findOne(
                            {
                                email: value
                            }
                        )
                    ) {
                        throw new Error(`Email already exist`)
                    }

                    return true;
                }
            ),

        body('password')
            .notEmpty().withMessage('Password is req').bail()
            .custom(
                (value, {req}) => {
                    const regex = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/
                    if (
                        !(regex.test(value))
                    ) {
                        throw new Error(`Password must be atleast 8 characters long and must contain uppercase, lowercase, digit and special characters`)
                    }

                    return true
                }
            ),

        body('confirm_password')
            .notEmpty().withMessage('Confirm Password is req').bail()
            .custom(
                (value, {req}) => {
                    if (
                        value !== req.body.password
                    ) {
                        throw new Error(`Password does not match`)
                    }

                    return true
                }
            )
    ]
}

//verify OTP
const validationforOTP = () => {
    return [
        body('register_otp')
            .notEmpty().withMessage('OTP is required').bail()
            .custom(
                (value, {req}) => {
                    const regex = /^[1-9]{4}$/
                    if (
                        !(regex.test(value))
                    ) {
                        throw new Error(`provide 4 digit OTP`)
                    }

                    return true
                }
            )
    ]
}

//login
const validationforlogin = () => {
    return [
        body('email')
            .notEmpty().withMessage('Email is req').bail()
            .isEmail().withMessage('Email is not valid'),

        body('password')
            .notEmpty().withMessage('Password is req')
    ]
}

//reset password
const validationforresetpassword = () => {
    return [
        body('password')
            .notEmpty().withMessage('Password is req').bail()
            .custom(
                (value, {req}) => {
                    const regex = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/
                    if (
                        !(regex.test(value))
                    ) {
                        throw new Error(`Password must be atleast 8 characters long and must contain uppercase, lowercase, digit and special characters`)
                    }

                    return true
                }
            ),

        body('confirm_password')
            .notEmpty().withMessage('Confirm Password is req').bail()
            .custom(
                (value, {req}) => {
                    if (
                        value !== req.body.password
                    ) {
                        throw new Error(`Password does not match`)
                    }

                    return true
                }
            )
    ]
}

//change password
const validationforchangepassword = () => {
    return [

        body('old_password')
            .notEmpty().withMessage('old password is req').bail()
            .custom(
                async (value, {req}) => {

                    if (
                        !(await bcrypt.compare(value, req.user.password))
                    ) {
                        throw new Error(`old password is not correct`)
                    }
                    return true
                }
            ).bail()
            .custom(
                (value, {req}) => {
                    if (
                        value === req.body.password
                    ) {
                        throw new Error(`new password should be different than previous one`)
                    }
                    return true
                }
            ),

        body('password')
            .notEmpty().withMessage('Password is req').bail()
            .custom(
                (value, {req}) => {
                    const regex = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/
                    if (
                        !(regex.test(value))
                    ) {
                        throw new Error(`Password must be atleast 8 characters long and must contain uppercase, lowercase, digit and special characters`)
                    }

                    return true
                }
            ),

        body('confirm_password')
            .notEmpty().withMessage('Confirm Password is req').bail()
            .custom(
                (value, {req}) => {
                    if (
                        value !== req.body.password
                    ) {
                        throw new Error(`Password does not match`)
                    }

                    return true
                }
            )


    ]
}


module.exports = {
    validationforregister,
    validationforlogin,
    validationforOTP,
    validationforresetpassword,
    validationforchangepassword

}
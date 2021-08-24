const User = require('../models/user');
const bcrypt = require('bcrypt')
const {body} = require("express-validator");
const nodemailer = require('nodemailer');
const utils = require('../utils')

const transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "61a28de6556e44",
        pass: "8e6f0050c86e51"
    }
});

const crypto = require('crypto')


// register
const register = async (req, res) => {


    const user = new User(
        {
            name: req.body.name,
            email: req.body.email,
            password: await bcrypt.hash(req.body.password, 10),
            confirm_password: await bcrypt.hash(req.body.confirm_password, 10),
            // register_otp: Math.floor(1000 + Math.random() * 9000),
            // register_otp_expiry: Date.now() + 1000 * 60
        }
    )

    try {

        const result = await user.save();

        //
        // const message = {
        //     from: "from-example@email.com",
        //     to: "to-example@email.com",
        //     subject: "OTP Verification",
        //     text: `
        //            OTP is ${result.register_otp}
        //            `
        // }
        //
        // transporter.sendMail(message, function (err, info) {
        //         if (err) {
        //             console.log(err)
        //         } else {
        //             console.log(info);
        //         }
        //     }
        // )
        //
        //
        // res
        //     .send(
        //         {
        //             status: 1,
        //             msg: `4 digit OTP is send to ${req.body.email}, pls verify OTP to activate the account, OTP is valid only for 1min`
        //         }
        //     )

        res
            .send(
                {
                    status: 1,
                    msg: 'user registered success'
                }
            )

    } catch
        (e) {
        console.log(e.message)
        res
            .status(500)
            .send(
                {
                    status: 0,
                    msg: e.message
                }
            )
    }

}

// //verify OTP
// const verify_otp = async (req, res) => {
//     const register_otp = req.body.register_otp;
//     const email = req.body.email
//
//     const result = await User.findOne(
//         {
//             register_otp,
//             email
//         }
//     )
//
//     if (!result) {
//         return res
//             .status(401)
//             .send(
//                 {
//                     status: 0,
//                     msg: 'OTP is invalid'
//                 }
//             )
//     }
//
//     if (
//         Date.now() > result.register_otp_expiry
//     ) {
//         return res
//             .status(401)
//             .send(
//                 {
//                     status: 0,
//                     msg: 'OTP is expired'
//                 }
//             )
//     }
//
//     result.register_otp = null
//     result.register_otp_expiry = null
//     result.is_account_active = true
//     await result.save()
//
//     res
//         .send(
//             {
//                 status: 1,
//                 msg: 'user registered success'
//             }
//         )
//
//
// }
//
// //resend OTP
// const resend_otp = async (req, res) => {
//     const email = req.body.email;
//     const result = await User.findOneAndUpdate(
//         {
//             email
//         },
//         {
//             register_otp: Math.floor(1000 + Math.random() * 9000),
//             register_otp_expiry: Date.now() + 1000 * 60
//         },
//         {
//             new: true
//         }
//     )
//
//     const message = {
//         from: "from-example@email.com",
//         to: "to-example@email.com",
//         subject: "Resend OTP",
//         text: `
//                    OTP is ${result.register_otp}
//                    `
//     }
//
//     transporter.sendMail(message, function (err, info) {
//             if (err) {
//                 console.log(err)
//             } else {
//                 console.log(info);
//             }
//         }
//     )
//
//     if (req.url !== '/login') {
//         res
//             .send(
//                 {
//                     status: 1,
//                     msg: 'OTP resend success'
//                 }
//             )
//     }
//
//
// }

//login
const login = async (req, res) => {

    try {

        const result = await User.findOne(
            {
                email: req.body.email
            }
        )

        if (!result) {
            return res
                .status(401)
                .send(
                    {
                        status: 0,
                        msg: 'wrong credentials'
                    }
                )
        }

        if (
            !(await bcrypt.compare(req.body.password, result.password))
        ) {
            return res
                .status(401)
                .send(
                    {
                        status: 0,
                        msg: 'wrong credentials'
                    }
                )
        }

        //
        // if (
        //     !result.is_account_active
        // ) {
        //
        //     await resend_otp(req, res)
        //
        //     return res
        //         .status(401)
        //         .send(
        //             {
        //                 status: 2,
        //                 msg: `Account is inactive we have sent new OTP to ${result.email}`
        //             }
        //         )
        // }

        //
        // req.session.user_id = result._id;
        // req.session.isauthenticated = true;
        //
        // res.cookie(
        //     'auth',
        //     req.sessionID
        // )

        const token = await utils.generatetoken(
            {
                _id: result._id,
                name: result.name,
                email: result.email
            }
        )

        res
            .send(
                {
                    status: 1,
                    msg: 'login success',
                    token
                }
            )

    } catch (e) {
        console.log(e.message)
        res
            .status(500)
            .send(
                {
                    status: 0,
                    msg: e.message
                }
            )
    }
}

//forget password
const forget_password = async (req, res) => {

    const email = req.body.email;
    const result = await User.findOne(
        {
            email
        }
    )

    if (!result) {
        res
            .status(401)
            .send(
                {
                    status: 0,
                    msg: 'Email does not exist'
                }
            )
    }

    result.reset_password_token = crypto.randomBytes(32).toString('hex')
    result.reset_password_token_expiry = Date.now() + 1000 * 60 * 15
    await result.save()

    const message = {
        from: "from-example@email.com",
        to: "to-example@email.com",
        subject: "Reset Password link",
        text: `
                   Hi ${result.name},
                   click the below url to reset the password, url is valid only for 15 min
                   http://localhost:4200/reset-password/${result.reset_password_token}
                   `
    }

    transporter.sendMail(message, function (err, info) {
            if (err) {
                console.log(err)
            } else {
                console.log(info);
            }
        }
    )

    res
        .send(
            {
                status: 1,
                msg: `new url is sent to ${result.email} to reset the password`
            }
        )

}

//reset password
const reset_password = async (req, res) => {
    const reset_password_token = req.body.reset_password_token;

    const result = await User.findOne(
        {
            reset_password_token
        }
    )

    if (!result) {
        return res
            .status(401)
            .send(
                {
                    status: 1,
                    msg: 'token is invalid'
                }
            )
    }

    if (
        Date.now() > result.reset_password_token_expiry
    ) {
        return res
            .status(401)
            .send(
                {
                    status: 1,
                    msg: 'token is expired'
                }
            )
    }

    const password = await bcrypt.hash(req.body.password, 10);
    const confirm_password = await bcrypt.hash(req.body.confirm_password, 10);

    result.password = password;
    result.confirm_password = confirm_password;
    result.reset_password_token = null
    result.reset_password_token_expiry = null
    await result.save()


    res
        .send(
            {
                status: 1,
                msg: 'password reset success'
            }
        )


}

//change password
const change_password = async (req, res) => {
    const password = await bcrypt.hash(req.body.password, 10);
    const confirm_password = await bcrypt.hash(req.body.confirm_password, 10);

    req.user.password = password;
    req.user.confirm_password = confirm_password;
    await req.user.save()


    res
        .send(
            {
                status: 1,
                msg: 'password changed success'
            }
        )
}

module.exports = {
    register,
    login,
    forget_password,
    reset_password,
    change_password

}
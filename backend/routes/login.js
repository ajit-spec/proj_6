require('dotenv').config()
const express = require('express');
const router = express.Router()
const logincontrollers = require('../controllers/login')
const loginvalidators = require('../validators/login')
const validate = require('../validate')
const auth = require('../auth')

//register
router.post(
    '/register',
    loginvalidators.validationforregister(),
    validate,
    logincontrollers.register
)

//login
router.post(
    '/login',
    loginvalidators.validationforlogin(),
    validate,
    logincontrollers.login
)

// protected
router.get(
    '/protected',
    auth,
    (req, res) => {
        console.log(req.user)
        res.json('welcome')
    }
)

//logout
router.get(
    '/logout',
    auth,
    (req, res) => {
        req.session.destroy()
        res.clearCookie()
        res.send('logout success')
    }
)

//
// //verify OTP
// router.post(
//     '/verify_otp',
//     logincontrollers.verify_otp
// )
//
// //resend OTP
// router.post(
//     '/resend_otp',
//     logincontrollers.resend_otp
// )

//forget password
router.post(
    '/forget_password',
    logincontrollers.forget_password
)

//reset password
router.post(
    '/reset_password',
    loginvalidators.validationforresetpassword(),
    validate,
    logincontrollers.reset_password
)

//change password
router.post(
    '/change_password',
    auth,
    loginvalidators.validationforchangepassword(),
    validate,
    logincontrollers.change_password
)

module.exports = router
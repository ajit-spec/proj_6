const User = require('./models/user')
const utils = require('./utils')

// const isauthenticated = async (req, res, next) => {
//
//     console.log(req.session)
//
//     if (
//         !(req.session.isauthenticated)
//     ) {
//         return res
//             .status(401)
//             .send(
//                 {
//                     status: 0,
//                     msg: 'not authenticated'
//                 }
//             )
//     }
//
//     req.user = await User.findById(req.session.user_id)
//     next();
//
//
// }

const isauthenticated = async (req, res, next) => {

    try {

        const result = await utils.verifytoken(req.body.jwt_token)

        if (
            !(result)
        ) {
            return res
                .status(401)
                .send(
                    {
                        status: 0,
                        msg: 'not authenticated'
                    }
                )
        }

        req.user = await User.findById(result._id)
        next();

    } catch (e) {
        console.log(e.message)
        return res
            .status(401)
            .send(
                {
                    status: 0,
                    msg: 'not authenticated'
                }
            )
    }


}

module.exports = isauthenticated
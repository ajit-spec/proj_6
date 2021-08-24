require('dotenv').config()
const jwt = require('jsonwebtoken');

const generatetoken = async (data) => {
    return await jwt.sign(
        data,
        process.env.JWT_ACCESS_TOKEN
    )
}

const verifytoken = async (token) => {
    return await jwt.verify(
        token,
        process.env.JWT_ACCESS_TOKEN
    )
}

module.exports = {
    generatetoken,
    verifytoken
}
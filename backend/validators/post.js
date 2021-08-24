const {body} = require('express-validator');
const Post = require('../models/post')

//add post
const validationforaddpost = () => {
    return [

        body('title')
            .notEmpty().withMessage('title is req').bail()
            .custom(
                async (value, {req}) => {
                    if (
                        (await Post.findOne({
                            title: value
                        }))
                    ) {
                        throw new Error(`title has to be unique`)
                    }
                    return true
                }
            ),

        body('description')
            .notEmpty().withMessage('description is req')

    ]
}


module.exports = {
    validationforaddpost
}
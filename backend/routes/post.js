require('dotenv').config()
const express = require('express');
const router = express.Router()
const auth = require('../auth')
const postcontrollers = require('../controllers/post')
const postvalidators = require('../validators/post')
const validate = require('../validate')


//add post
router.post(
    '/add_post',
    auth,
    postvalidators.validationforaddpost(),
    validate,
    postcontrollers.add_post
)

//delete post
router.post(
    '/delete_post/:_id',
    auth,
    postcontrollers.delete_post
)

//edit post
router.put(
        '/edit_post/:_id',
    auth,
    postvalidators.validationforaddpost(),
    validate,
    postcontrollers.edit_post
)

//get post
router.post(
    '/get_post',
    auth,
    postcontrollers.get_post
)

//get single post
router.post(
    '/get_single_post',
    auth,
    postcontrollers.get_single_post
)

module.exports = router
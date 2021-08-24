const Post = require('../models/post')
const {body} = require("express-validator");

//add post
const add_post = async (req, res) => {

    const user_id = req.user._id;

    const post = new Post(
        {
            title: req.body.title,
            description: req.body.description,
            user_id
        }
    )

    const result = await post.save();

    res
        .send(
            {
                status: 1,
                msg: 'new post added'
            }
        )
}

//delete post
const delete_post = async (req, res) => {
    const _id = req.params._id;
    const user_id = req.user._id;

    const result = await Post.findOne(
        {
            _id
        }
    )

    if (!result) {
        return res
            .send(
                {
                    status: 0,
                    msg: 'there is no post to delete'
                }
            )
    }

    if (!result.user_id.equals(user_id)) {
        return res
            .status(403)
            .send(
                {
                    status: 0,
                    msg: 'you are not allowed to delete the post'
                }
            )
    }

    await Post.findByIdAndDelete(
        {
            _id
        }
    )

    res
        .send(
            {
                status: 1,
                msg: 'post deleted'
            }
        )


}

//edit post
const edit_post = async (req, res) => {
    const _id = req.params._id;
    const user_id = req.user._id;

    const result = await Post.findOne(
        {
            _id
        }
    )

    if (!result) {
        return res
            .send(
                {
                    status: 0,
                    msg: 'there is no post to edit'
                }
            )
    }

    if (!result.user_id.equals(user_id)) {
        return res
            .status(403)
            .send(
                {
                    status: 0,
                    msg: 'you are not allowed to edit the post'
                }
            )
    }

    await Post.findByIdAndUpdate(
        {
            _id
        },
        req.body
    )

    res
        .send(
            {
                status: 1,
                msg: 'post edited'
            }
        )
}

//get post
const get_post = async (req, res) => {
    const result = await Post.find({})
    res.send(
        {
            status: 1,
            posts: result
        }
    )
}

//get single post
const get_single_post = async (req, res) => {
    const result = await Post.findById(req.body.blog_id)
    res.send(
        {
            status: 1,
            post: result
        }
    )
}

module.exports = {
    add_post,
    delete_post,
    edit_post,
    get_post,
    get_single_post
}
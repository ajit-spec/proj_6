const mongoose = require('mongoose')
const {Schema} = mongoose;

const postschema = new Schema(
    {
        title: {
            type: String,
            required: [true, 'title is req'],
            unique: true
        },
        description: {
            type: String,
            required: [true, 'description is req']
        },
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    }
)

const Post = mongoose.model('Post', postschema);

module.exports = Post
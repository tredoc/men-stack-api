const db = require('../db')

const blogSchema = new db.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number,
    user: {
        type: db.Schema.Types.ObjectId,
        ref: 'User'
    }
})

const Blog = db.model('Blog', blogSchema, 'blogs')

module.exports = Blog
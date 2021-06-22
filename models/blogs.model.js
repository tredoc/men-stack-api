const db = require('../db')

const blogSchema = db.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
})

const Blog = db.model('Blog', blogSchema, 'Blogs')

module.exports = Blog
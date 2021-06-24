const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')

const Blog = require('../models/blog.model')
const User = require('../models/user.model')

const tokenExtractor = require('../middlewares/tokenExtractor')
const { secret } = require('../config')

blogsRouter.get('/', (req, res) => {
    Blog
      .find({})
      .then(blogs => {
        res.json(blogs)
      })
})

blogsRouter.post('/', tokenExtractor, async (req, res) => {

  const { author, title, url, likes, userId } = req.body

  if (!author || !title || !userId) {
    return res.status(401).end()
  }

  const token = req.token

  const decodedToken = jwt.verify(token, secret)
  if (!(token && decodedToken.id)) {
    return res.status(401).json({error: 'token missing or invalid'})
  }

  const { username, id } = decodedToken
    
  if (id !== userId) {
    return res.status(401).json({error: 'token user id missmatch'})
  }

  const user = await User.findById(userId)

  const newBlog = new Blog({ author, title, url, likes, user: user._id })
  const savedBlog = await newBlog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  res.json(savedBlog)
  })

blogsRouter.delete('/:id', tokenExtractor, async (req, res, next) => {
  const { id } = req.params
  const token = req.token

  const decodedToken = jwt.verify(token, secret)
  if (!(token && decodedToken.id)) {
    return res.status(401).json({error: 'token missing or invalid'})
  }

  const user = await User.findById(decodedToken.id)

  console.log(user.blogs)

  if (!user.blogs.includes(id)) {
    return res.status(404).json({error: 'no premission to delete this blog'})
  }

  
  const removedBlog = await Blog.findByIdAndRemove(id)
  user.blogs = user.blogs.filter(blog => blog !== removedBlog._id)

  await user.save()

  res.json(removedBlog)
})
  
module.exports = blogsRouter